const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/forum');
  },
  filename: (req, file, cb) => {
    const uniqueFilename = `${uuidv4()}${path.extname(file.originalname)}`;
    cb(null, uniqueFilename);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const mimetype = allowedTypes.test(file.mimetype);
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('Only image files are allowed'));
  }
});

// Mock database for forum posts
let posts = [
  {
    id: '1',
    author: {
      id: 'user1',
      name: 'Kwame Mensah',
      avatar: '/avatars/farmer1.png',
      location: 'Kumasi'
    },
    createdAt: new Date(Date.now() - 7200000), // 2 hours ago
    title: 'Success with drought-resistant maize',
    content: 'I tried the new drought-resistant maize variety this season and the results are amazing! Even with the reduced rainfall, my yield increased by 30%. Has anyone else tried this variety?',
    image: null,
    likes: 24,
    comments: [
      {
        id: 'comment1',
        author: {
          id: 'user2',
          name: 'Ama Owusu',
          avatar: '/avatars/farmer2.png'
        },
        content: 'Yes, I tried it too! Great results in the Eastern Region.',
        createdAt: new Date(Date.now() - 3600000) // 1 hour ago
      }
    ],
    tags: ['Maize', 'Success Story', 'Drought Resistant']
  },
  {
    id: '2',
    author: {
      id: 'user2',
      name: 'Ama Owusu',
      avatar: '/avatars/farmer2.png',
      location: 'Tamale'
    },
    createdAt: new Date(Date.now() - 86400000), // 1 day ago
    title: 'Help with tomato leaf disease',
    content: 'My tomato plants have yellow spots on the leaves and they\'re starting to curl. I\'ve attached a photo. Has anyone seen this before? What treatment would you recommend?',
    image: '/forum/tomato-disease.jpg',
    likes: 12,
    comments: [],
    tags: ['Tomatoes', 'Plant Disease', 'Help Needed']
  }
];

// Get all posts
router.get('/posts', (req, res) => {
  res.json(posts);
});

// Get a single post by ID
router.get('/posts/:id', (req, res) => {
  const post = posts.find(p => p.id === req.params.id);
  
  if (!post) {
    return res.status(404).json({ message: 'Post not found' });
  }
  
  res.json(post);
});

// Create a new post
router.post('/posts', upload.single('image'), (req, res) => {
  try {
    const { title, content, tags } = req.body;
    
    // Validate required fields
    if (!title || !content) {
      return res.status(400).json({ message: 'Title and content are required' });
    }
    
    // Create new post
    const newPost = {
      id: uuidv4(),
      author: {
        id: req.user?.id || 'guest', // In production, get from authenticated user
        name: req.user?.name || 'Guest User',
        avatar: req.user?.avatar || '/avatars/default.png',
        location: req.user?.location || 'Ghana'
      },
      createdAt: new Date(),
      title,
      content,
      image: req.file ? `/uploads/forum/${req.file.filename}` : null,
      likes: 0,
      comments: [],
      tags: tags ? tags.split(',').map(tag => tag.trim()) : []
    };
    
    // Add to posts array (in production, save to database)
    posts.unshift(newPost);
    
    res.status(201).json(newPost);
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ message: 'Failed to create post' });
  }
});

// Add a comment to a post
router.post('/posts/:id/comments', (req, res) => {
  try {
    const { content } = req.body;
    const postId = req.params.id;
    
    // Validate required fields
    if (!content) {
      return res.status(400).json({ message: 'Comment content is required' });
    }
    
    // Find the post
    const post = posts.find(p => p.id === postId);
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    
    // Create new comment
    const newComment = {
      id: uuidv4(),
      author: {
        id: req.user?.id || 'guest', // In production, get from authenticated user
        name: req.user?.name || 'Guest User',
        avatar: req.user?.avatar || '/avatars/default.png'
      },
      content,
      createdAt: new Date()
    };
    
    // Add comment to post
    post.comments.push(newComment);
    
    res.status(201).json(newComment);
  } catch (error) {
    console.error('Error adding comment:', error);
    res.status(500).json({ message: 'Failed to add comment' });
  }
});

// Like a post
router.post('/posts/:id/like', (req, res) => {
  try {
    const postId = req.params.id;
    
    // Find the post
    const post = posts.find(p => p.id === postId);
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    
    // Increment likes
    post.likes += 1;
    
    res.json({ likes: post.likes });
  } catch (error) {
    console.error('Error liking post:', error);
    res.status(500).json({ message: 'Failed to like post' });
  }
});

// Get trending topics
router.get('/trending', (req, res) => {
  // In a real app, this would analyze post data to find trending topics
  // For demo purposes, we'll return mock data
  
  const trendingTopics = [
    {
      id: '1',
      title: 'Dealing with Fall Armyworm',
      posts: 45,
      summary: 'Farmers are sharing effective methods to control Fall Armyworm infestations in maize crops. Popular solutions include early detection, natural predators, and targeted pesticide application.'
    },
    {
      id: '2',
      title: 'Irrigation techniques for dry season',
      posts: 38,
      summary: 'Discussion on cost-effective irrigation methods during the dry season. Drip irrigation and water conservation practices are being recommended by experienced farmers.'
    },
    {
      id: '3',
      title: 'New government subsidy program',
      posts: 62,
      summary: 'Information sharing about the new fertilizer subsidy program. Farmers are discussing application processes, eligibility criteria, and sharing experiences with the registration system.'
    }
  ];
  
  res.json(trendingTopics);
});

module.exports = router;