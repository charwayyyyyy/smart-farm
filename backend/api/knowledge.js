const express = require('express');
const router = express.Router();
const OpenAI = require('openai');
const { PineconeClient } = require('@pinecone-database/pinecone');
const { authenticateToken, isAdmin } = require('../utils/auth');
const KnowledgeArticle = require('../models/KnowledgeArticle');
const User = require('../models/User');
const { Op } = require('sequelize');

// Initialize OpenAI client or mock
let openai;
try {
  if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'sk-test-key-for-development') {
    console.log('Using mock OpenAI client for knowledge service');
    // Mock OpenAI client
    openai = {
      embeddings: {
        create: async () => ({ 
          data: [{ embedding: Array(1536).fill(0).map(() => Math.random()) }] 
        })
      }
    };
  } else {
    openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });
  }
} catch (error) {
  console.error('Error initializing OpenAI for knowledge service:', error);
  // Fallback to mock
  openai = {
    embeddings: {
      create: async () => ({ 
        data: [{ embedding: Array(1536).fill(0).map(() => Math.random()) }] 
      })
    }
  };
}

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

// @route   POST /api/knowledge/articles
// @desc    Create a new knowledge article
// @access  Private/Admin
router.post('/articles', authenticateToken, isAdmin, async (req, res) => {
  try {
    const { 
      title, 
      content, 
      summary, 
      tags, 
      cropTypes, 
      regions, 
      imageUrl, 
      videoUrl, 
      documentUrl, 
      language, 
      status 
    } = req.body;
    
    // Create article
    const article = await KnowledgeArticle.create({
      title,
      content,
      summary,
      authorId: req.user.id,
      tags,
      cropTypes,
      regions,
      imageUrl,
      videoUrl,
      documentUrl,
      language,
      status,
      publishedAt: status === 'published' ? new Date() : null
    });
    
    // Generate embeddings for the article if Pinecone is available
    if (!useMockPinecone) {
      try {
        const textToEmbed = `${title} ${summary || ''} ${content}`;
        const embedding = await generateEmbeddings(textToEmbed);
        
        // Store embeddings in Pinecone
        await pineconeIndex.upsert({
          vectors: [{
            id: article.id,
            values: embedding,
            metadata: {
              articleId: article.id,
              title,
              tags: tags || [],
              cropTypes: cropTypes || [],
              regions: regions || [],
              language: language || 'en'
            }
          }]
        });
        
        // Update article with embedding reference
        article.vectorEmbedding = { id: article.id };
        await article.save();
      } catch (error) {
        console.error('Error storing embeddings in Pinecone:', error);
        // Continue without vector embeddings
      }
    } else {
      console.log('Skipping vector embedding storage (using mock Pinecone)');
    }
    
    res.status(201).json({
      success: true,
      message: 'Knowledge article created successfully',
      article
    });
  } catch (error) {
    console.error('Create article error:', error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

// @route   GET /api/knowledge/articles
// @desc    Get all knowledge articles with filtering
// @access  Public
router.get('/articles', async (req, res) => {
  try {
    const { 
      tag, 
      cropType, 
      region, 
      language, 
      status, 
      search,
      page = 1,
      limit = 10
    } = req.query;
    
    // Build query conditions
    const where = {};
    
    // Only show published articles to non-admin users
    if (!req.user || req.user.role !== 'admin') {
      where.status = 'published';
    } else if (status) {
      where.status = status;
    }
    
    if (language) where.language = language;
    if (tag) where.tags = { [Op.contains]: [tag] };
    if (cropType) where.cropTypes = { [Op.contains]: [cropType] };
    if (region) where.regions = { [Op.contains]: [region] };
    
    // Text search
    if (search) {
      where[Op.or] = [
        { title: { [Op.iLike]: `%${search}%` } },
        { content: { [Op.iLike]: `%${search}%` } },
        { summary: { [Op.iLike]: `%${search}%` } }
      ];
    }
    
    // Pagination
    const offset = (page - 1) * limit;
    
    // Get articles
    const { count, rows: articles } = await KnowledgeArticle.findAndCountAll({
      where,
      include: [{ model: User, as: 'author', attributes: ['id', 'name'] }],
      order: [['createdAt', 'DESC']],
      limit,
      offset
    });
    
    res.json({
      success: true,
      count,
      pages: Math.ceil(count / limit),
      currentPage: page,
      articles
    });
  } catch (error) {
    console.error('Get articles error:', error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

// @route   GET /api/knowledge/articles/:id
// @desc    Get a single knowledge article
// @access  Public
router.get('/articles/:id', async (req, res) => {
  try {
    const article = await KnowledgeArticle.findByPk(req.params.id, {
      include: [{ model: User, as: 'author', attributes: ['id', 'name'] }]
    });
    
    if (!article) {
      return res.status(404).json({ success: false, message: 'Article not found' });
    }
    
    // Check if article is published or user is admin
    if (article.status !== 'published' && (!req.user || req.user.role !== 'admin')) {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }
    
    // Increment view count
    article.viewCount += 1;
    await article.save();
    
    res.json({
      success: true,
      article
    });
  } catch (error) {
    console.error('Get article error:', error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

// @route   PUT /api/knowledge/articles/:id
// @desc    Update a knowledge article
// @access  Private/Admin
router.put('/articles/:id', authenticateToken, isAdmin, async (req, res) => {
  try {
    const article = await KnowledgeArticle.findByPk(req.params.id);
    
    if (!article) {
      return res.status(404).json({ success: false, message: 'Article not found' });
    }
    
    const { 
      title, 
      content, 
      summary, 
      tags, 
      cropTypes, 
      regions, 
      imageUrl, 
      videoUrl, 
      documentUrl, 
      language, 
      status 
    } = req.body;
    
    // Update fields
    if (title) article.title = title;
    if (content) article.content = content;
    if (summary !== undefined) article.summary = summary;
    if (tags) article.tags = tags;
    if (cropTypes) article.cropTypes = cropTypes;
    if (regions) article.regions = regions;
    if (imageUrl !== undefined) article.imageUrl = imageUrl;
    if (videoUrl !== undefined) article.videoUrl = videoUrl;
    if (documentUrl !== undefined) article.documentUrl = documentUrl;
    if (language) article.language = language;
    
    // Update status and publishedAt if needed
    if (status) {
      article.status = status;
      if (status === 'published' && !article.publishedAt) {
        article.publishedAt = new Date();
      }
    }
    
    await article.save();
    
    // Update embeddings if content changed and Pinecone is available
    if ((title || content || summary) && !useMockPinecone) {
      try {
        const textToEmbed = `${article.title} ${article.summary || ''} ${article.content}`;
        const embedding = await generateEmbeddings(textToEmbed);
        
        // Update in Pinecone
        await pineconeIndex.upsert({
          vectors: [{
            id: article.id,
            values: embedding,
            metadata: {
              articleId: article.id,
              title: article.title,
              tags: article.tags || [],
              cropTypes: article.cropTypes || [],
            regions: article.regions || [],
            language: article.language || 'en'
          }
        }]
      });
      } catch (error) {
        console.error('Error updating embeddings in Pinecone:', error);
        // Continue without updating vector embeddings
      }
    } else if (title || content || summary) {
      console.log('Skipping vector embedding update (using mock Pinecone)');
    }
    
    res.json({
      success: true,
      message: 'Article updated successfully',
      article
    });
  } catch (error) {
    console.error('Update article error:', error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

// @route   DELETE /api/knowledge/articles/:id
// @desc    Delete a knowledge article
// @access  Private/Admin
router.delete('/articles/:id', authenticateToken, isAdmin, async (req, res) => {
  try {
    const article = await KnowledgeArticle.findByPk(req.params.id);
    
    if (!article) {
      return res.status(404).json({ success: false, message: 'Article not found' });
    }
    
    // Delete from Pinecone if available
    if (!useMockPinecone && article.vectorEmbedding && article.vectorEmbedding.id) {
      try {
        await pineconeIndex.delete({
          ids: [article.vectorEmbedding.id]
        });
      } catch (error) {
        console.error('Error deleting from Pinecone:', error);
        // Continue with database deletion even if Pinecone deletion fails
      }
    }
    
    // Delete from database
    await article.destroy();
    
    res.json({
      success: true,
      message: 'Article deleted successfully'
    });
  } catch (error) {
    console.error('Delete article error:', error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

// @route   GET /api/knowledge/tags
// @desc    Get all unique tags
// @access  Public
router.get('/tags', async (req, res) => {
  try {
    const articles = await KnowledgeArticle.findAll({
      attributes: ['tags'],
      where: { status: 'published' }
    });
    
    // Extract and flatten all tags
    const allTags = articles.reduce((tags, article) => {
      return tags.concat(article.tags || []);
    }, []);
    
    // Get unique tags
    const uniqueTags = [...new Set(allTags)];
    
    res.json({
      success: true,
      tags: uniqueTags
    });
  } catch (error) {
    console.error('Get tags error:', error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

// @route   GET /api/knowledge/crops
// @desc    Get all unique crop types
// @access  Public
router.get('/crops', async (req, res) => {
  try {
    const articles = await KnowledgeArticle.findAll({
      attributes: ['cropTypes'],
      where: { status: 'published' }
    });
    
    // Extract and flatten all crop types
    const allCropTypes = articles.reduce((crops, article) => {
      return crops.concat(article.cropTypes || []);
    }, []);
    
    // Get unique crop types
    const uniqueCropTypes = [...new Set(allCropTypes)];
    
    res.json({
      success: true,
      crops: uniqueCropTypes
    });
  } catch (error) {
    console.error('Get crops error:', error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

// @route   GET /api/knowledge/regions
// @desc    Get all unique regions
// @access  Public
router.get('/regions', async (req, res) => {
  try {
    const articles = await KnowledgeArticle.findAll({
      attributes: ['regions'],
      where: { status: 'published' }
    });
    
    // Extract and flatten all regions
    const allRegions = articles.reduce((regions, article) => {
      return regions.concat(article.regions || []);
    }, []);
    
    // Get unique regions
    const uniqueRegions = [...new Set(allRegions)];
    
    res.json({
      success: true,
      regions: uniqueRegions
    });
  } catch (error) {
    console.error('Get regions error:', error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

module.exports = router;