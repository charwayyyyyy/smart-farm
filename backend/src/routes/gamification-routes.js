const express = require('express');
const router = express.Router();
const gamificationService = require('../services/gamification-service');

// Get all available quizzes
router.get('/quizzes', (req, res) => {
  try {
    const quizzes = gamificationService.getQuizzes();
    res.json(quizzes);
  } catch (error) {
    console.error('Error fetching quizzes:', error);
    res.status(500).json({ error: 'Failed to fetch quizzes' });
  }
});

// Get a specific quiz by ID
router.get('/quizzes/:quizId', (req, res) => {
  try {
    const { quizId } = req.params;
    const quiz = gamificationService.getQuiz(quizId);
    
    if (!quiz) {
      return res.status(404).json({ error: 'Quiz not found' });
    }
    
    res.json(quiz);
  } catch (error) {
    console.error('Error fetching quiz:', error);
    res.status(500).json({ error: 'Failed to fetch quiz' });
  }
});

// Submit quiz answers and get results
router.post('/quizzes/:quizId/submit', (req, res) => {
  try {
    const { quizId } = req.params;
    const { answers } = req.body;
    const userId = req.query.userId || 'user123';
    
    if (!answers || !Array.isArray(answers)) {
      return res.status(400).json({ error: 'Answers must be provided as an array' });
    }
    
    const results = gamificationService.submitQuizAnswers(userId, quizId, answers);
    
    if (!results) {
      return res.status(404).json({ error: 'Quiz not found' });
    }
    
    res.json(results);
  } catch (error) {
    console.error('Error submitting quiz answers:', error);
    res.status(500).json({ error: 'Failed to submit quiz answers' });
  }
});

// Get user progress
router.get('/progress', (req, res) => {
  try {
    const userId = req.query.userId || 'user123';
    const progress = gamificationService.getUserProgress(userId);
    res.json(progress);
  } catch (error) {
    console.error('Error fetching user progress:', error);
    res.status(500).json({ error: 'Failed to fetch user progress' });
  }
});

// Get all available badges
router.get('/badges', (req, res) => {
  try {
    const badges = gamificationService.getAllBadges();
    res.json(badges);
  } catch (error) {
    console.error('Error fetching badges:', error);
    res.status(500).json({ error: 'Failed to fetch badges' });
  }
});

module.exports = router;