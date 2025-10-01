const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'uploads/disease-detection';
    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueFilename = `${uuidv4()}${path.extname(file.originalname)}`;
    cb(null, uniqueFilename);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png/;
    const mimetype = allowedTypes.test(file.mimetype);
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('Only image files (jpeg, jpg, png) are allowed'));
  }
});

// Database of common crop diseases (in production, use a real database)
const cropDiseases = {
  'tomato_late_blight': {
    name: 'Tomato Late Blight',
    scientificName: 'Phytophthora infestans',
    symptoms: 'Dark brown spots on leaves, stems, and fruits. White fungal growth may appear on the underside of leaves in humid conditions.',
    causes: 'Fungal pathogen that thrives in cool, wet conditions.',
    treatment: [
      'Apply copper-based fungicides as a preventative measure',
      'Ensure good air circulation by proper spacing between plants',
      'Avoid overhead irrigation; water at the base of plants',
      'Remove and destroy infected plant parts',
      'Rotate crops, avoiding planting tomatoes in the same location for 3-4 years'
    ],
    preventionTips: [
      'Use disease-resistant varieties',
      'Plant in well-drained soil',
      'Apply mulch to prevent soil splash onto leaves',
      'Avoid working with plants when they are wet'
    ]
  },
  'maize_fall_armyworm': {
    name: 'Maize Fall Armyworm',
    scientificName: 'Spodoptera frugiperda',
    symptoms: 'Ragged feeding damage on leaves, sawdust-like frass (excrement) in the whorl, and damage to tassels and ears.',
    causes: 'Invasive caterpillar pest that can cause significant damage to maize crops.',
    treatment: [
      'Apply appropriate biopesticides or insecticides early in the infestation',
      'Introduce natural enemies like parasitic wasps',
      'Use pheromone traps to monitor and reduce adult moth populations',
      'Apply neem-based products as a natural deterrent'
    ],
    preventionTips: [
      'Plant early to avoid peak infestation periods',
      'Implement crop rotation',
      'Maintain field sanitation by removing crop residues',
      'Use push-pull technology (intercropping with repellent and trap plants)'
    ]
  },
  'cassava_mosaic_disease': {
    name: 'Cassava Mosaic Disease',
    scientificName: 'Caused by various geminiviruses',
    symptoms: 'Yellow or pale green mosaic pattern on leaves, leaf distortion, stunted growth, and reduced tuber yield.',
    causes: 'Viral disease transmitted by whiteflies and through infected cuttings.',
    treatment: [
      'No cure once plants are infected; remove and destroy infected plants',
      'Control whitefly populations with appropriate insecticides',
      'Use clean, disease-free planting material'
    ],
    preventionTips: [
      'Plant resistant varieties',
      'Use virus-free stem cuttings for planting',
      'Implement regular field monitoring',
      'Practice crop rotation and field sanitation'
    ]
  },
  'rice_blast': {
    name: 'Rice Blast',
    scientificName: 'Magnaporthe oryzae',
    symptoms: 'Diamond-shaped lesions on leaves, necrotic spots on stems, and partial or complete grain sterility.',
    causes: 'Fungal pathogen favored by high humidity, extended periods of leaf wetness, and high nitrogen levels.',
    treatment: [
      'Apply fungicides at early stages of infection',
      'Maintain balanced fertilization, avoiding excessive nitrogen',
      'Ensure proper water management in paddy fields'
    ],
    preventionTips: [
      'Plant resistant varieties',
      'Use certified disease-free seeds',
      'Avoid dense planting',
      'Practice field sanitation and crop rotation'
    ]
  }
};

// Detect disease from image
router.post('/detect', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No image file provided' });
    }
    
    const { crop } = req.body;
    
    if (!crop) {
      return res.status(400).json({ message: 'Crop type is required' });
    }
    
    // In production, this would call a real ML model API
    // For demo purposes, we'll simulate a detection result
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Get random disease for the demo
    const cropDiseasesKeys = Object.keys(cropDiseases);
    const randomDiseaseKey = cropDiseasesKeys[Math.floor(Math.random() * cropDiseasesKeys.length)];
    const detectedDisease = cropDiseases[randomDiseaseKey];
    
    // Confidence score between 70-95%
    const confidenceScore = Math.floor(Math.random() * 26) + 70;
    
    // Return detection result
    res.json({
      success: true,
      imageUrl: `/uploads/disease-detection/${req.file.filename}`,
      detection: {
        disease: detectedDisease.name,
        scientificName: detectedDisease.scientificName,
        confidenceScore: confidenceScore,
        symptoms: detectedDisease.symptoms,
        causes: detectedDisease.causes,
        treatment: detectedDisease.treatment,
        preventionTips: detectedDisease.preventionTips
      }
    });
  } catch (error) {
    console.error('Error detecting disease:', error);
    res.status(500).json({ message: 'Failed to process image for disease detection' });
  }
});

// Get information about a specific disease
router.get('/diseases/:diseaseId', (req, res) => {
  const disease = cropDiseases[req.params.diseaseId];
  
  if (!disease) {
    return res.status(404).json({ message: 'Disease information not found' });
  }
  
  res.json(disease);
});

// Get all supported diseases
router.get('/diseases', (req, res) => {
  const diseasesList = Object.entries(cropDiseases).map(([id, data]) => ({
    id,
    name: data.name,
    scientificName: data.scientificName
  }));
  
  res.json(diseasesList);
});

// Get supported crops
router.get('/supported-crops', (req, res) => {
  // In production, this would come from a database
  const supportedCrops = [
    { id: 'tomato', name: 'Tomato' },
    { id: 'maize', name: 'Maize' },
    { id: 'cassava', name: 'Cassava' },
    { id: 'rice', name: 'Rice' },
    { id: 'pepper', name: 'Pepper' },
    { id: 'cocoa', name: 'Cocoa' },
    { id: 'plantain', name: 'Plantain' }
  ];
  
  res.json(supportedCrops);
});

module.exports = router;