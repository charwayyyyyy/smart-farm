const { Op } = require('sequelize');
const twilio = require('twilio');
const { FarmerSubscription, Crop, User } = require('../backend/models');

// Initialize Twilio client with fallback for development
let twilioClient;
if (!process.env.TWILIO_ACCOUNT_SID || !process.env.TWILIO_AUTH_TOKEN) {
  console.log('Warning: Twilio credentials missing. SMS functionality will be disabled.');
  twilioClient = null;
} else {
  try {
    twilioClient = twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN
    );
  } catch (error) {
    console.log('Warning: Failed to initialize Twilio client. SMS functionality will be disabled.');
    twilioClient = null;
  }
}

/**
 * Calculate farming events based on planting date and crop information
 * @param {Date} plantingDate - The date when the crop was planted
 * @param {Object} crop - The crop information
 * @returns {Object} - Object containing dates for key farming events
 */
const calculateFarmingEvents = (plantingDate, crop) => {
  const events = {};
  const plantDate = new Date(plantingDate);
  
  // Planting date
  events.planting = plantDate;
  
  // Fertilizing dates (typically 2-3 weeks after planting and then mid-season)
  const firstFertilizing = new Date(plantDate);
  firstFertilizing.setDate(plantDate.getDate() + 14); // 2 weeks after planting
  events.firstFertilizing = firstFertilizing;
  
  const secondFertilizing = new Date(plantDate);
  secondFertilizing.setDate(plantDate.getDate() + Math.floor(crop.growingPeriod / 2)); // Mid-season
  events.secondFertilizing = secondFertilizing;
  
  // Watering schedule (based on crop's watering frequency)
  events.watering = [];
  let wateringDate = new Date(plantDate);
  while (wateringDate < events.harvest) {
    wateringDate = new Date(wateringDate);
    wateringDate.setDate(wateringDate.getDate() + crop.wateringFrequency);
    events.watering.push(new Date(wateringDate));
  }
  
  // Pest control (typically 1 month after planting and then monthly)
  events.pestControl = [];
  let pestControlDate = new Date(plantDate);
  pestControlDate.setDate(plantDate.getDate() + 30); // 1 month after planting
  
  while (pestControlDate < events.harvest) {
    events.pestControl.push(new Date(pestControlDate));
    pestControlDate = new Date(pestControlDate);
    pestControlDate.setDate(pestControlDate.getDate() + 30); // Monthly
  }
  
  // Harvesting (based on crop's growing period)
  const harvestDate = new Date(plantDate);
  harvestDate.setDate(plantDate.getDate() + crop.growingPeriod);
  events.harvest = harvestDate;
  
  return events;
};

/**
 * Generate message for a farming event
 * @param {String} eventType - Type of farming event
 * @param {Object} subscription - The farmer's subscription
 * @param {Object} crop - The crop information
 * @param {Date} eventDate - Date of the event
 * @returns {String} - Formatted message for the event
 */
const generateEventMessage = (eventType, subscription, crop, eventDate) => {
  const cropName = crop.name;
  const daysUntil = Math.ceil((eventDate - new Date()) / (1000 * 60 * 60 * 24));
  const dateStr = eventDate.toLocaleDateString();
  
  switch (eventType) {
    case 'planting':
      return `Hello! It's time to plant your ${cropName} crop. Best planting practices include [specific instructions].`;
    
    case 'firstFertilizing':
      return `Hello! In ${daysUntil} days (${dateStr}), you should apply the first round of fertilizer to your ${cropName} crop. Use nitrogen-rich fertilizer for best results.`;
    
    case 'secondFertilizing':
      return `Hello! In ${daysUntil} days (${dateStr}), it will be time for the second application of fertilizer for your ${cropName} crop. Consider using [specific fertilizer type].`;
    
    case 'watering':
      return `Hello! Remember to water your ${cropName} crop in the next ${daysUntil} days. Ensure adequate moisture, especially during this critical growth stage.`;
    
    case 'pestControl':
      return `Hello! In ${daysUntil} days (${dateStr}), inspect your ${cropName} crop for pests and apply appropriate pest control measures if needed.`;
    
    case 'harvest':
      return `Hello! Your ${cropName} crop will be ready for harvest in approximately ${daysUntil} days (${dateStr}). Look for these signs of readiness: [specific indicators].`;
    
    default:
      return `Hello! This is a reminder about your ${cropName} crop. Check your farming calendar for upcoming activities.`;
  }
};

/**
 * Send SMS notifications for upcoming farming events
 */
const sendCalendarReminders = async () => {
  try {
    console.log('Running calendar reminders service...');
    
    // Get all active subscriptions
    const subscriptions = await FarmerSubscription.findAll({
      where: { isActive: true },
      include: [
        { model: Crop },
        { model: User, attributes: ['id', 'phone', 'preferredLanguage'] }
      ]
    });
    
    console.log(`Found ${subscriptions.length} active subscriptions`);
    
    // Process each subscription
    for (const subscription of subscriptions) {
      if (!subscription.User || !subscription.User.phone) {
        console.log(`Skipping subscription ${subscription.id} - no valid phone number`);
        continue;
      }
      
      const events = calculateFarmingEvents(subscription.plantingDate, subscription.Crop);
      const today = new Date();
      const phone = subscription.User.phone;
      
      // Check for upcoming events (within next 7 days)
      for (const [eventType, eventDate] of Object.entries(events)) {
        // Skip watering and pest control arrays
        if (Array.isArray(eventDate)) continue;
        
        const daysUntil = Math.ceil((eventDate - today) / (1000 * 60 * 60 * 24));
        
        // If event is within reminder window (0-7 days away)
        if (daysUntil >= 0 && daysUntil <= 7) {
          const message = generateEventMessage(eventType, subscription, subscription.Crop, eventDate);
          
          // Send SMS if Twilio client is available
          if (twilioClient) {
            await twilioClient.messages.create({
              body: message,
              from: process.env.TWILIO_PHONE_NUMBER,
              to: phone
            });
            console.log(`Sent ${eventType} reminder to ${phone} for ${subscription.Crop.name}`);
          } else {
            console.log(`[Mock] Would send ${eventType} reminder to ${phone} for ${subscription.Crop.name}: ${message}`);
          }
          
          // Update last notification sent
          subscription.lastNotificationSent = new Date();
          await subscription.save();
        }
      }
      
      // Check watering schedule
      if (events.watering && events.watering.length > 0) {
        for (const wateringDate of events.watering) {
          const daysUntil = Math.ceil((wateringDate - today) / (1000 * 60 * 60 * 24));
          
          if (daysUntil >= 0 && daysUntil <= 3) { // Shorter window for watering reminders
            const message = generateEventMessage('watering', subscription, subscription.Crop, wateringDate);
            
            if (twilioClient) {
              await twilioClient.messages.create({
                body: message,
                from: process.env.TWILIO_PHONE_NUMBER,
                to: phone
              });
              console.log(`Sent watering reminder to ${phone} for ${subscription.Crop.name}`);
            } else {
              console.log(`[Mock] Would send watering reminder to ${phone} for ${subscription.Crop.name}: ${message}`);
            }
            
            subscription.lastNotificationSent = new Date();
            await subscription.save();
            break; // Only send one watering reminder at a time
          }
        }
      }
      
      // Check pest control schedule
      if (events.pestControl && events.pestControl.length > 0) {
        for (const pestControlDate of events.pestControl) {
          const daysUntil = Math.ceil((pestControlDate - today) / (1000 * 60 * 60 * 24));
          
          if (daysUntil >= 0 && daysUntil <= 5) { // 5-day window for pest control
            const message = generateEventMessage('pestControl', subscription, subscription.Crop, pestControlDate);
            
            if (twilioClient) {
              await twilioClient.messages.create({
                body: message,
                from: process.env.TWILIO_PHONE_NUMBER,
                to: phone
              });
              console.log(`Sent pest control reminder to ${phone} for ${subscription.Crop.name}`);
            } else {
              console.log(`[Mock] Would send pest control reminder to ${phone} for ${subscription.Crop.name}: ${message}`);
            }
            
            subscription.lastNotificationSent = new Date();
            await subscription.save();
            break; // Only send one pest control reminder at a time
          }
        }
      }
    }
    
    console.log('Calendar reminders service completed');
  } catch (error) {
    console.error('Error in calendar reminders service:', error);
  }
};

module.exports = {
  calculateFarmingEvents,
  generateEventMessage,
  sendCalendarReminders
};