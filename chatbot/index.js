require('dotenv').config();
const OpenAI = require('openai');
const { PineconeClient } = require('@pinecone-database/pinecone');

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Initialize Pinecone client
let pineconeIndex;

const initPinecone = async () => {
  try {
    const pinecone = new PineconeClient();
    await pinecone.init({
      environment: process.env.PINECONE_ENVIRONMENT,
      apiKey: process.env.PINECONE_API_KEY
    });
    pineconeIndex = pinecone.Index(process.env.PINECONE_INDEX);
    console.log('Pinecone initialized successfully');
    return pineconeIndex;
  } catch (error) {
    console.error('Pinecone initialization error:', error);
    throw error;
  }
};

/**
 * Generate embeddings for text using OpenAI
 * @param {string} text - Text to generate embeddings for
 * @returns {Promise<Array>} - Vector embeddings
 */
const generateEmbeddings = async (text) => {
  try {
    const response = await openai.embeddings.create({
      model: 'text-embedding-ada-002',
      input: text
    });
    return response.data[0].embedding;
  } catch (error) {
    console.error('Error generating embeddings:', error);
    throw error;
  }
};

/**
 * Search for relevant knowledge articles using vector similarity
 * @param {string} query - User's query
 * @param {number} limit - Maximum number of results to return
 * @returns {Promise<Array>} - Relevant knowledge articles
 */
const searchKnowledgeBase = async (query, limit = 3) => {
  try {
    if (!pineconeIndex) {
      await initPinecone();
    }
    
    // Generate embeddings for the query
    const queryEmbedding = await generateEmbeddings(query);
    
    // Search Pinecone for similar vectors
    const results = await pineconeIndex.query({
      queryVector: queryEmbedding,
      topK: limit,
      includeMetadata: true
    });
    
    return results.matches.map(match => ({
      id: match.metadata.articleId,
      title: match.metadata.title,
      score: match.score,
      metadata: match.metadata
    }));
  } catch (error) {
    console.error('Knowledge base search error:', error);
    return [];
  }
};

/**
 * Generate a response using the OpenAI API
 * @param {string} userMessage - User's message
 * @param {Array} context - Context from knowledge base
 * @returns {Promise<string>} - AI response
 */
const generateResponse = async (userMessage, context = []) => {
  try {
    // Prepare context from relevant articles
    let contextText = '';
    if (context.length > 0) {
      contextText = context.map(article => 
        `ARTICLE: ${article.title}\n${article.content || ''}\n`
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
      ${contextText}`
    };
    
    // Generate response using OpenAI
    const completion = await openai.chat.completions.create({
      model: 'gpt-4-turbo',
      messages: [
        systemMessage,
        { role: 'user', content: userMessage }
      ],
      temperature: 0.7,
      max_tokens: 500
    });
    
    return completion.choices[0].message.content;
  } catch (error) {
    console.error('Error generating response:', error);
    throw error;
  }
};

/**
 * Transcribe audio to text using OpenAI Whisper
 * @param {Buffer} audioBuffer - Audio file buffer
 * @returns {Promise<string>} - Transcribed text
 */
const transcribeAudio = async (audioBuffer) => {
  try {
    const transcription = await openai.audio.transcriptions.create({
      file: audioBuffer,
      model: 'whisper-1'
    });
    
    return transcription.text;
  } catch (error) {
    console.error('Error transcribing audio:', error);
    throw error;
  }
};

/**
 * Process a chat message and return a response
 * @param {string} message - User's message
 * @returns {Promise<Object>} - Response object
 */
const processChat = async (message) => {
  try {
    // Search knowledge base for relevant information
    const relevantArticles = await searchKnowledgeBase(message);
    
    // Generate response
    const aiResponse = await generateResponse(message, relevantArticles);
    
    return {
      message: aiResponse,
      sources: relevantArticles
    };
  } catch (error) {
    console.error('Error processing chat:', error);
    throw error;
  }
};

/**
 * Process voice input and return text and audio response
 * @param {Buffer} audioBuffer - Audio file buffer
 * @returns {Promise<Object>} - Response object with text and audio
 */
const processVoice = async (audioBuffer) => {
  try {
    // Transcribe audio
    const transcribedText = await transcribeAudio(audioBuffer);
    
    // Get chatbot response
    const { message, sources } = await processChat(transcribedText);
    
    // This would be replaced with actual TTS API call
    const audioResponse = {
      url: '/api/audio/placeholder.mp3', // Placeholder URL
      duration: message.length / 20 // Rough estimate of audio duration in seconds
    };
    
    return {
      transcription: transcribedText,
      message: message,
      audioUrl: audioResponse.url,
      sources: sources
    };
  } catch (error) {
    console.error('Error processing voice:', error);
    throw error;
  }
};

module.exports = {
  initPinecone,
  generateEmbeddings,
  searchKnowledgeBase,
  generateResponse,
  transcribeAudio,
  processChat,
  processVoice
};

// If this file is run directly, initialize Pinecone
if (require.main === module) {
  initPinecone().then(() => {
    console.log('Chatbot service initialized');
  }).catch(error => {
    console.error('Failed to initialize chatbot service:', error);
  });
}