const express = require('express');
const router = express.Router();
const OpenAI = require('openai');
const { PineconeClient } = require('@pinecone-database/pinecone');
const { authenticateToken } = require('../utils/auth');
const KnowledgeArticle = require('../models/KnowledgeArticle');

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Initialize Pinecone client
let pineconeIndex;
let useMockPinecone = false;

const initPinecone = async () => {
  try {
    // Check if we have valid Pinecone credentials
    if (!process.env.PINECONE_API_KEY || 
        process.env.PINECONE_API_KEY === 'your_pinecone_api_key_here' ||
        !process.env.PINECONE_ENVIRONMENT || 
        process.env.PINECONE_ENVIRONMENT === 'your_pinecone_environment' ||
        !process.env.PINECONE_INDEX || 
        process.env.PINECONE_INDEX === 'smartfarmgh-index') {
      console.log('Using mock Pinecone service for development');
      useMockPinecone = true;
      return;
    }
    
    const pinecone = new PineconeClient();
    await pinecone.init({
      environment: process.env.PINECONE_ENVIRONMENT,
      apiKey: process.env.PINECONE_API_KEY
    });
    pineconeIndex = pinecone.Index(process.env.PINECONE_INDEX);
    console.log('Pinecone initialized successfully');
  } catch (error) {
    console.error('Pinecone initialization error:', error);
    console.log('Falling back to mock Pinecone service');
    useMockPinecone = true;
  }
};

// Initialize Pinecone on startup
initPinecone();

/**
 * Generate embeddings for text using OpenAI
 * @param {string} text - Text to generate embeddings for
 * @returns {Promise<Array>} - Vector embeddings
 */
const generateEmbeddings = async (text) => {
  const response = await openai.embeddings.create({
    model: 'text-embedding-ada-002',
    input: text
  });
  return response.data[0].embedding;
};

/**
 * Search for relevant knowledge articles using vector similarity
 * @param {string} query - User's query
 * @param {number} limit - Maximum number of results to return
 * @returns {Promise<Array>} - Relevant knowledge articles
 */
const searchKnowledgeBase = async (query, limit = 3) => {
  try {
    if (useMockPinecone) {
      // Use a simple keyword search as fallback when Pinecone is not available
      console.log('Using mock search for knowledge base');
      const keywords = query.toLowerCase().split(' ');
      
      // Get all articles from the database
      const allArticles = await KnowledgeArticle.findAll({
        attributes: ['id', 'title', 'content', 'summary', 'tags', 'cropTypes', 'regions']
      });
      
      // Simple relevance scoring based on keyword matches
      const scoredArticles = allArticles.map(article => {
        const text = `${article.title} ${article.content} ${article.summary} ${article.tags.join(' ')}`.toLowerCase();
        const score = keywords.reduce((acc, keyword) => {
          return acc + (text.includes(keyword) ? 1 : 0);
        }, 0);
        return { article, score };
      });
      
      // Sort by score and return top matches
      return scoredArticles
        .sort((a, b) => b.score - a.score)
        .slice(0, limit)
        .map(item => item.article);
    }
    
    // Generate embeddings for the query
    const queryEmbedding = await generateEmbeddings(query);
    
    // Search Pinecone for similar vectors
    const results = await pineconeIndex.query({
      queryVector: queryEmbedding,
      topK: limit,
      includeMetadata: true
    });
    
    // Get the article IDs from the results
    const articleIds = results.matches.map(match => match.metadata.articleId);
    
    // Fetch the full articles from the database
    const articles = await KnowledgeArticle.findAll({
      where: { id: articleIds },
      attributes: ['id', 'title', 'content', 'summary', 'tags', 'cropTypes', 'regions']
    });
    
    return articles;
  } catch (error) {
    console.error('Knowledge base search error:', error);
    return [];
  }
};

// @route   POST /api/chatbot/chat
// @desc    Chat with the AI assistant
// @access  Private
router.post('/chat', authenticateToken, async (req, res) => {
  try {
    const { message, conversationId } = req.body;
    const userId = req.user.id;
    
    // Search knowledge base for relevant information
    const relevantArticles = await searchKnowledgeBase(message);
    
    // Prepare context from relevant articles
    let context = '';
    if (relevantArticles.length > 0) {
      context = relevantArticles.map(article => 
        `ARTICLE: ${article.title}\n${article.content}\n`
      ).join('\n');
    }
    
    // Prepare system message with context
    const systemMessage = {
      role: 'system',
      content: `You are SmartFarmGH, an AI assistant specialized in Ghanaian agriculture. 
      You provide helpful, accurate, and practical farming advice to farmers in Ghana.
      Be friendly, clear, and use simple language. When appropriate, include specific 
      information relevant to Ghanaian farming conditions, crops, and practices.
      
      If you don't know something, admit it rather than making up information.
      
      Here is some relevant information from our knowledge base that may help with the query:
      ${context}`
    };
    
    // Generate response using OpenAI
    const completion = await openai.chat.completions.create({
      model: 'gpt-4-turbo',
      messages: [
        systemMessage,
        { role: 'user', content: message }
      ],
      temperature: 0.7,
      max_tokens: 500
    });
    
    const aiResponse = completion.choices[0].message.content;
    
    // Return the response
    res.json({
      success: true,
      message: aiResponse,
      conversationId: conversationId || Date.now().toString(),
      sources: relevantArticles.map(article => ({
        id: article.id,
        title: article.title,
        summary: article.summary
      }))
    });
  } catch (error) {
    console.error('Chatbot error:', error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

// @route   POST /api/chatbot/voice
// @desc    Process voice input and return audio response
// @access  Private
router.post('/voice', authenticateToken, async (req, res) => {
  try {
    // Handle audio file upload
    if (!req.files || !req.files.audio) {
      return res.status(400).json({ success: false, message: 'No audio file uploaded' });
    }
    
    const audioFile = req.files.audio;
    
    // Transcribe audio using Whisper
    const transcription = await openai.audio.transcriptions.create({
      file: audioFile.data,
      model: 'whisper-1'
    });
    
    const transcribedText = transcription.text;
    
    // Get chatbot response to the transcribed text
    const relevantArticles = await searchKnowledgeBase(transcribedText);
    
    let context = '';
    if (relevantArticles.length > 0) {
      context = relevantArticles.map(article => 
        `ARTICLE: ${article.title}\n${article.content}\n`
      ).join('\n');
    }
    
    const systemMessage = {
      role: 'system',
      content: `You are SmartFarmGH, an AI assistant specialized in Ghanaian agriculture. 
      You provide helpful, accurate, and practical farming advice to farmers in Ghana.
      Be friendly, clear, and use simple language. When appropriate, include specific 
      information relevant to Ghanaian farming conditions, crops, and practices.
      
      If you don't know something, admit it rather than making up information.
      
      Here is some relevant information from our knowledge base that may help with the query:
      ${context}`
    };
    
    const completion = await openai.chat.completions.create({
      model: 'gpt-4-turbo',
      messages: [
        systemMessage,
        { role: 'user', content: transcribedText }
      ],
      temperature: 0.7,
      max_tokens: 500
    });
    
    const aiResponse = completion.choices[0].message.content;
    
    // Convert response to speech using ElevenLabs or similar TTS service
    // This is a placeholder - implement actual TTS integration
    const audioResponse = await generateSpeech(aiResponse);
    
    res.json({
      success: true,
      transcription: transcribedText,
      message: aiResponse,
      audioUrl: audioResponse.url, // URL to the generated audio file
      sources: relevantArticles.map(article => ({
        id: article.id,
        title: article.title,
        summary: article.summary
      }))
    });
  } catch (error) {
    console.error('Voice chatbot error:', error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

// Placeholder for TTS function - implement with actual TTS service
const generateSpeech = async (text) => {
  // This would be replaced with actual TTS API call
  console.log('Generating speech for:', text);
  return {
    url: '/api/audio/placeholder.mp3', // Placeholder URL
    duration: text.length / 20 // Rough estimate of audio duration in seconds
  };
};

module.exports = router;