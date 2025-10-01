const { v4: uuidv4 } = require('uuid');

// Mock database for quizzes
const quizzes = [
  {
    id: '1',
    title: 'Crop Management Basics',
    description: 'Test your knowledge about basic crop management practices',
    difficulty: 'beginner',
    questions: [
      {
        id: '101',
        text: 'What is the best time to apply fertilizer to maize?',
        options: [
          'Before planting',
          '2-3 weeks after germination',
          'During flowering',
          'After harvest'
        ],
        correctAnswer: 1,
        explanation: 'Applying fertilizer 2-3 weeks after germination ensures the plants can utilize nutrients during their growth phase.'
      },
      {
        id: '102',
        text: 'Which of these is NOT a sign of nitrogen deficiency in plants?',
        options: [
          'Yellowing of older leaves',
          'Stunted growth',
          'Purple coloration of stems',
          'Excessive vegetative growth'
        ],
        correctAnswer: 3,
        explanation: 'Excessive vegetative growth is actually a sign of too much nitrogen, not deficiency.'
      },
      {
        id: '103',
        text: 'How often should newly planted tomato seedlings be watered?',
        options: [
          'Once a week',
          'Every other day',
          'Daily',
          'Twice daily'
        ],
        correctAnswer: 2,
        explanation: 'Daily watering is recommended for newly planted tomato seedlings to establish strong roots.'
      }
    ]
  },
  {
    id: '2',
    title: 'Pest Management',
    description: 'Learn to identify and manage common crop pests',
    difficulty: 'intermediate',
    questions: [
      {
        id: '201',
        text: 'Which pest commonly attacks maize tassels and ears?',
        options: [
          'Aphids',
          'Fall armyworm',
          'Stem borer',
          'Whiteflies'
        ],
        correctAnswer: 1,
        explanation: 'Fall armyworm is a serious pest that feeds on maize tassels and developing ears.'
      },
      {
        id: '202',
        text: 'What is integrated pest management (IPM)?',
        options: [
          'Using only chemical pesticides',
          'Using only biological controls',
          'Combining multiple pest control strategies',
          'Allowing natural predators to control all pests'
        ],
        correctAnswer: 2,
        explanation: 'IPM combines multiple strategies including cultural practices, biological controls, and judicious use of pesticides.'
      }
    ]
  },
  {
    id: '3',
    title: 'Soil Health',
    description: 'Test your knowledge about maintaining healthy soil',
    difficulty: 'intermediate',
    questions: [
      {
        id: '301',
        text: 'What is the ideal pH range for most crops?',
        options: [
          '3.0-4.0',
          '5.5-7.0',
          '8.0-9.0',
          '10.0-11.0'
        ],
        correctAnswer: 1,
        explanation: 'Most crops grow best in slightly acidic to neutral soil with pH between 5.5 and 7.0.'
      },
      {
        id: '302',
        text: 'Which practice helps improve soil structure?',
        options: [
          'Continuous monocropping',
          'Removing all crop residues',
          'Adding organic matter',
          'Deep plowing when soil is wet'
        ],
        correctAnswer: 2,
        explanation: 'Adding organic matter improves soil structure, water retention, and nutrient availability.'
      }
    ]
  }
];

// Mock database for badges
const badges = [
  {
    id: '1',
    name: 'Farming Novice',
    description: 'Complete your first quiz',
    image: 'novice_badge.svg',
    criteria: { quizzesCompleted: 1 }
  },
  {
    id: '2',
    name: 'Knowledge Seeker',
    description: 'Complete 5 quizzes',
    image: 'seeker_badge.svg',
    criteria: { quizzesCompleted: 5 }
  },
  {
    id: '3',
    name: 'Perfect Score',
    description: 'Get 100% on any quiz',
    image: 'perfect_badge.svg',
    criteria: { perfectScores: 1 }
  },
  {
    id: '4',
    name: 'Crop Master',
    description: 'Complete all crop management quizzes',
    image: 'crop_master_badge.svg',
    criteria: { categories: ['crop_management'] }
  },
  {
    id: '5',
    name: 'Pest Expert',
    description: 'Complete all pest management quizzes',
    image: 'pest_expert_badge.svg',
    criteria: { categories: ['pest_management'] }
  }
];

// Mock database for user progress
const userProgress = {
  'user123': {
    quizzesCompleted: [
      {
        quizId: '1',
        completedAt: '2023-06-15T10:30:00Z',
        score: 2,
        totalQuestions: 3,
        percentage: 66.7
      }
    ],
    badges: ['1'],
    points: 200,
    level: 2
  }
};

// Get all available quizzes
const getQuizzes = () => {
  return quizzes.map(quiz => ({
    id: quiz.id,
    title: quiz.title,
    description: quiz.description,
    difficulty: quiz.difficulty,
    questionCount: quiz.questions.length
  }));
};

// Get a specific quiz by ID
const getQuiz = (quizId) => {
  const quiz = quizzes.find(q => q.id === quizId);
  if (!quiz) return null;
  
  // Return quiz without answers for frontend display
  return {
    id: quiz.id,
    title: quiz.title,
    description: quiz.description,
    difficulty: quiz.difficulty,
    questions: quiz.questions.map(q => ({
      id: q.id,
      text: q.text,
      options: q.options
    }))
  };
};

// Submit quiz answers and get results
const submitQuizAnswers = (userId, quizId, answers) => {
  const quiz = quizzes.find(q => q.id === quizId);
  if (!quiz) return null;
  
  let correctCount = 0;
  const results = [];
  
  // Check each answer
  quiz.questions.forEach(question => {
    const userAnswer = answers.find(a => a.questionId === question.id);
    const isCorrect = userAnswer && userAnswer.answer === question.correctAnswer;
    
    if (isCorrect) correctCount++;
    
    results.push({
      questionId: question.id,
      isCorrect,
      correctAnswer: question.correctAnswer,
      explanation: question.explanation
    });
  });
  
  const score = correctCount;
  const totalQuestions = quiz.questions.length;
  const percentage = (correctCount / totalQuestions) * 100;
  
  // Update user progress
  if (!userProgress[userId]) {
    userProgress[userId] = {
      quizzesCompleted: [],
      badges: [],
      points: 0,
      level: 1
    };
  }
  
  // Check if user already completed this quiz
  const existingAttempt = userProgress[userId].quizzesCompleted.findIndex(q => q.quizId === quizId);
  
  if (existingAttempt >= 0) {
    // Update existing attempt if new score is better
    if (score > userProgress[userId].quizzesCompleted[existingAttempt].score) {
      userProgress[userId].quizzesCompleted[existingAttempt] = {
        quizId,
        completedAt: new Date().toISOString(),
        score,
        totalQuestions,
        percentage
      };
    }
  } else {
    // Add new attempt
    userProgress[userId].quizzesCompleted.push({
      quizId,
      completedAt: new Date().toISOString(),
      score,
      totalQuestions,
      percentage
    });
    
    // Award points for first completion
    userProgress[userId].points += 50 + (percentage / 2);
  }
  
  // Check for level up
  const newLevel = Math.floor(userProgress[userId].points / 100) + 1;
  if (newLevel > userProgress[userId].level) {
    userProgress[userId].level = newLevel;
  }
  
  // Check for new badges
  const newBadges = checkForNewBadges(userId);
  
  return {
    score,
    totalQuestions,
    percentage,
    results,
    newBadges,
    level: userProgress[userId].level,
    points: userProgress[userId].points
  };
};

// Check if user earned any new badges
const checkForNewBadges = (userId) => {
  if (!userProgress[userId]) return [];
  
  const user = userProgress[userId];
  const newBadges = [];
  
  badges.forEach(badge => {
    // Skip if user already has this badge
    if (user.badges.includes(badge.id)) return;
    
    let earned = false;
    
    // Check criteria
    if (badge.criteria.quizzesCompleted && user.quizzesCompleted.length >= badge.criteria.quizzesCompleted) {
      earned = true;
    }
    
    if (badge.criteria.perfectScores) {
      const perfectScores = user.quizzesCompleted.filter(q => q.percentage === 100).length;
      if (perfectScores >= badge.criteria.perfectScores) {
        earned = true;
      }
    }
    
    // Add more criteria checks as needed
    
    if (earned) {
      user.badges.push(badge.id);
      newBadges.push(badge);
      
      // Award points for earning a badge
      user.points += 25;
    }
  });
  
  return newBadges;
};

// Get user progress
const getUserProgress = (userId) => {
  if (!userProgress[userId]) {
    return {
      quizzesCompleted: [],
      badges: [],
      points: 0,
      level: 1
    };
  }
  
  // Get badge details
  const userBadges = userProgress[userId].badges.map(badgeId => {
    return badges.find(b => b.id === badgeId);
  }).filter(Boolean);
  
  return {
    quizzesCompleted: userProgress[userId].quizzesCompleted,
    badges: userBadges,
    points: userProgress[userId].points,
    level: userProgress[userId].level
  };
};

// Get all available badges
const getAllBadges = () => {
  return badges;
};

module.exports = {
  getQuizzes,
  getQuiz,
  submitQuizAnswers,
  getUserProgress,
  getAllBadges
};