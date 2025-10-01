// SMS Service for SmartFarmGH
// This service handles sending SMS notifications to farmers

// In a production environment, this would use an SMS gateway provider like Twilio, Africa's Talking, etc.
// For demonstration purposes, we'll implement a mock service

/**
 * Send an SMS message to a phone number
 * @param {string} phoneNumber - The recipient's phone number
 * @param {string} message - The message content
 * @returns {Promise<object>} - Response object with status and message ID
 */
const sendSMS = async (phoneNumber, message) => {
  try {
    // Log the SMS for demonstration
    console.log(`Sending SMS to ${phoneNumber}: ${message}`);
    
    // In production, replace with actual SMS gateway API call
    // Example with Twilio:
    /*
    const twilioClient = require('twilio')(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN
    );
    
    const response = await twilioClient.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phoneNumber
    });
    
    return {
      success: true,
      messageId: response.sid
    };
    */
    
    // Mock successful response
    return {
      success: true,
      messageId: `mock-${Date.now()}-${Math.floor(Math.random() * 1000)}`
    };
  } catch (error) {
    console.error('Error sending SMS:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

/**
 * Schedule an SMS to be sent at a future time
 * @param {string} phoneNumber - The recipient's phone number
 * @param {string} message - The message content
 * @param {Date} scheduledTime - When to send the message
 * @returns {Promise<object>} - Response object with schedule status
 */
const scheduleSMS = async (phoneNumber, message, scheduledTime) => {
  try {
    // Log the scheduled SMS for demonstration
    console.log(`Scheduling SMS to ${phoneNumber} at ${scheduledTime}: ${message}`);
    
    // In production, use a job scheduler like node-schedule, bull, or agenda
    // For demonstration, we'll just set a timeout if the time is in the future
    
    const now = new Date();
    const timeToSend = new Date(scheduledTime);
    
    if (timeToSend > now) {
      const delayMs = timeToSend.getTime() - now.getTime();
      
      setTimeout(() => {
        sendSMS(phoneNumber, message);
      }, delayMs);
      
      return {
        success: true,
        scheduledId: `schedule-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        scheduledTime: timeToSend
      };
    } else {
      // If time is in the past, send immediately
      return sendSMS(phoneNumber, message);
    }
  } catch (error) {
    console.error('Error scheduling SMS:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

/**
 * Send bulk SMS messages to multiple recipients
 * @param {Array<string>} phoneNumbers - Array of recipient phone numbers
 * @param {string} message - The message content
 * @returns {Promise<object>} - Response object with bulk send status
 */
const sendBulkSMS = async (phoneNumbers, message) => {
  try {
    // Log the bulk SMS for demonstration
    console.log(`Sending bulk SMS to ${phoneNumbers.length} recipients: ${message}`);
    
    // In production, use SMS gateway's bulk send API
    // For demonstration, we'll just loop through the numbers
    
    const results = await Promise.all(
      phoneNumbers.map(phoneNumber => sendSMS(phoneNumber, message))
    );
    
    return {
      success: true,
      totalSent: results.filter(r => r.success).length,
      totalFailed: results.filter(r => !r.success).length,
      results
    };
  } catch (error) {
    console.error('Error sending bulk SMS:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

module.exports = {
  sendSMS,
  scheduleSMS,
  sendBulkSMS
};