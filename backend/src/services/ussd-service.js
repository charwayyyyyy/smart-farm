const express = require('express');
const router = express.Router();
const { OpenAI } = require('openai');
const { sendSMS } = require('./sms-service');

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// In-memory session storage (replace with Redis or database in production)
const sessions = {};

// USSD menu states
const STATES = {
  MAIN_MENU: 'MAIN_MENU',
  REGISTER_CROP: 'REGISTER_CROP',
  CROP_TYPE: 'CROP_TYPE',
  CROP_AREA: 'CROP_AREA',
  PLANTING_DATE: 'PLANTING_DATE',
  ASK_QUESTION: 'ASK_QUESTION',
  WEATHER_ALERT: 'WEATHER_ALERT',
  MARKET_PRICES: 'MARKET_PRICES',
};

// Process USSD requests
const processUSSD = async (req, res) => {
  const { sessionId, serviceCode, phoneNumber, text } = req.body;
  
  let response = '';
  
  // Initialize or retrieve session
  if (!sessions[sessionId]) {
    sessions[sessionId] = {
      state: STATES.MAIN_MENU,
      data: {
        phoneNumber,
        crops: [],
        currentCrop: {}
      }
    };
  }
  
  const session = sessions[sessionId];
  
  // Process based on current state and user input
  switch (session.state) {
    case STATES.MAIN_MENU:
      if (text === '') {
        // First request, show main menu
        response = `CON SmartFarmGH\n1. Register Crop\n2. Ask Farming Question\n3. Weather Alerts\n4. Market Prices\n5. Exit`;
      } else {
        // Process menu selection
        const option = text.split('*').pop();
        
        switch (option) {
          case '1':
            session.state = STATES.REGISTER_CROP;
            response = `CON Enter crop name:`;
            break;
          case '2':
            session.state = STATES.ASK_QUESTION;
            response = `CON Type your farming question:`;
            break;
          case '3':
            session.state = STATES.WEATHER_ALERT;
            response = `CON Enter your location (district):`;
            break;
          case '4':
            session.state = STATES.MARKET_PRICES;
            response = `CON Select crop for price info:\n1. Maize\n2. Rice\n3. Cassava\n4. Tomatoes\n5. Plantain`;
            break;
          case '5':
            response = `END Thank you for using SmartFarmGH!`;
            delete sessions[sessionId];
            break;
          default:
            response = `CON Invalid option. Try again:\n1. Register Crop\n2. Ask Farming Question\n3. Weather Alerts\n4. Market Prices\n5. Exit`;
        }
      }
      break;
      
    case STATES.REGISTER_CROP:
      // Save crop name and ask for type
      session.data.currentCrop.name = text.split('*').pop();
      session.state = STATES.CROP_TYPE;
      response = `CON Select crop type:\n1. Cereal\n2. Vegetable\n3. Fruit\n4. Tuber\n5. Other`;
      break;
      
    case STATES.CROP_TYPE:
      // Save crop type and ask for area
      const typeMap = {
        '1': 'Cereal',
        '2': 'Vegetable',
        '3': 'Fruit',
        '4': 'Tuber',
        '5': 'Other'
      };
      session.data.currentCrop.type = typeMap[text.split('*').pop()] || 'Other';
      session.state = STATES.CROP_AREA;
      response = `CON Enter planted area (in acres):`;
      break;
      
    case STATES.CROP_AREA:
      // Save planted area and ask for planting date
      session.data.currentCrop.area = text.split('*').pop();
      session.state = STATES.PLANTING_DATE;
      response = `CON Enter planting date (DD/MM/YYYY):`;
      break;
      
    case STATES.PLANTING_DATE:
      // Save planting date and complete registration
      session.data.currentCrop.plantingDate = text.split('*').pop();
      
      // Add crop to user's crops
      session.data.crops.push({...session.data.currentCrop});
      
      // Schedule SMS reminders based on crop type and planting date
      scheduleCropReminders(session.data.phoneNumber, session.data.currentCrop);
      
      // Return to main menu
      session.state = STATES.MAIN_MENU;
      session.data.currentCrop = {};
      
      response = `END Crop registered successfully! You will receive SMS reminders for key farming activities.`;
      break;
      
    case STATES.ASK_QUESTION:
      // Process farming question with AI
      const question = text.split('*').pop();
      
      try {
        // For demo purposes, we'll use predefined answers
        // In production, use OpenAI API
        const answers = {
          'how to plant maize': 'Plant maize seeds 2.5cm deep in rows 75cm apart. Seeds should be 25cm apart in rows. Best planted at start of rainy season.',
          'how to control pests': 'For natural pest control, try neem oil spray, introduce beneficial insects, or use companion planting with marigolds or basil.',
          'best fertilizer for tomatoes': 'Tomatoes need fertilizer rich in phosphorus and potassium. Apply organic compost at planting and every 4-6 weeks.',
          'when to harvest cassava': 'Cassava is ready for harvest 8-12 months after planting. Leaves turn yellow and fall off when ready.'
        };
        
        let answer = answers[question.toLowerCase()];
        
        if (!answer) {
          // Simplified AI response for demo
          answer = 'For detailed farming advice, please visit our SmartFarmGH center or use our mobile app when online.';
        }
        
        // Send answer via SMS for reference
        sendSMS(session.data.phoneNumber, `SmartFarmGH Answer: ${answer}`);
        
        response = `END ${answer}\n\nA copy has been sent to your phone for reference.`;
      } catch (error) {
        console.error('Error processing question:', error);
        response = `END Sorry, we couldn't process your question. Please try again later.`;
      }
      break;
      
    case STATES.WEATHER_ALERT:
      // Process weather alert subscription
      const location = text.split('*').pop();
      
      // Subscribe user to weather alerts for their location
      subscribeToWeatherAlerts(session.data.phoneNumber, location);
      
      response = `END You've been subscribed to weather alerts for ${location}. You'll receive SMS updates for rainfall, drought, and extreme weather.`;
      break;
      
    case STATES.MARKET_PRICES:
      // Provide market prices for selected crop
      const cropOption = text.split('*').pop();
      const crops = ['Maize', 'Rice', 'Cassava', 'Tomatoes', 'Plantain'];
      const selectedCrop = crops[parseInt(cropOption) - 1];
      
      if (selectedCrop) {
        // Get market prices (simulated)
        const prices = getMarketPrices(selectedCrop);
        response = `END Current ${selectedCrop} prices:\n${prices}\n\nUpdated daily. For more markets, use our app.`;
      } else {
        response = `END Invalid selection. Please try again.`;
      }
      break;
      
    default:
      // Reset to main menu if state is unknown
      session.state = STATES.MAIN_MENU;
      response = `CON SmartFarmGH\n1. Register Crop\n2. Ask Farming Question\n3. Weather Alerts\n4. Market Prices\n5. Exit`;
  }
  
  // Set session timeout (15 minutes)
  setTimeout(() => {
    delete sessions[sessionId];
  }, 15 * 60 * 1000);
  
  res.set('Content-Type', 'text/plain');
  res.send(response);
};

// Helper functions
function scheduleCropReminders(phoneNumber, crop) {
  // In production, store in database and use a job scheduler
  console.log(`Scheduled reminders for ${phoneNumber} for ${crop.name}`);
}

function subscribeToWeatherAlerts(phoneNumber, location) {
  // In production, store in database
  console.log(`Subscribed ${phoneNumber} to weather alerts for ${location}`);
}

function getMarketPrices(crop) {
  // Simulated market prices
  const markets = {
    'Maize': 'Accra: GHS 350/bag\nKumasi: GHS 320/bag\nTamale: GHS 300/bag',
    'Rice': 'Accra: GHS 550/bag\nKumasi: GHS 520/bag\nTamale: GHS 500/bag',
    'Cassava': 'Accra: GHS 200/bag\nKumasi: GHS 180/bag\nTamale: GHS 150/bag',
    'Tomatoes': 'Accra: GHS 800/crate\nKumasi: GHS 750/crate\nTamale: GHS 700/crate',
    'Plantain': 'Accra: GHS 50/bunch\nKumasi: GHS 45/bunch\nTamale: GHS 55/bunch'
  };
  
  return markets[crop] || 'Price data not available';
}

// Export the USSD processing function
module.exports = {
  processUSSD
};