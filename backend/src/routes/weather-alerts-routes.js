const express = require('express');
const router = express.Router();
const weatherAlertsService = require('../services/weather-alerts-service');

// Initialize the weather alerts service
weatherAlertsService.initWeatherAlertsService();

/**
 * @route GET /api/weather/locations
 * @desc Get all available locations with weather data
 * @access Public
 */
router.get('/locations', (req, res) => {
  try {
    const locations = weatherAlertsService.getAvailableLocations();
    res.json({ success: true, locations });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

/**
 * @route GET /api/weather/:location
 * @desc Get weather data for a specific location
 * @access Public
 */
router.get('/:location', (req, res) => {
  try {
    const { location } = req.params;
    const weatherData = weatherAlertsService.getWeatherData(location);
    
    if (!weatherData) {
      return res.status(404).json({ success: false, message: 'Location not found' });
    }
    
    res.json({ success: true, data: weatherData });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

/**
 * @route POST /api/weather/crops/register
 * @desc Register a crop for a user
 * @access Private
 */
router.post('/crops/register', (req, res) => {
  try {
    const registration = req.body;
    
    // In a real app, you would get the userId from the authenticated user
    if (!registration.userId) {
      registration.userId = req.headers['x-user-id'] || 'demo-user';
    }
    
    const newRegistration = weatherAlertsService.registerCrop(registration);
    res.status(201).json({ success: true, registration: newRegistration });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

/**
 * @route GET /api/weather/crops/user/:userId
 * @desc Get user's crop registrations
 * @access Private
 */
router.get('/crops/user/:userId', (req, res) => {
  try {
    const { userId } = req.params;
    
    // In a real app, you would verify that the authenticated user matches userId
    
    const registrations = weatherAlertsService.getUserCropRegistrations(userId);
    res.json({ success: true, registrations });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

/**
 * @route POST /api/weather/alerts/subscribe
 * @desc Subscribe a user to weather alerts
 * @access Private
 */
router.post('/alerts/subscribe', (req, res) => {
  try {
    const subscription = req.body;
    
    // In a real app, you would get the userId from the authenticated user
    if (!subscription.userId) {
      subscription.userId = req.headers['x-user-id'] || 'demo-user';
    }
    
    const newSubscription = weatherAlertsService.subscribeToWeatherAlerts(subscription);
    res.status(201).json({ success: true, subscription: newSubscription });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

/**
 * @route DELETE /api/weather/alerts/unsubscribe/:subscriptionId
 * @desc Unsubscribe a user from weather alerts
 * @access Private
 */
router.delete('/alerts/unsubscribe/:subscriptionId', (req, res) => {
  try {
    const { subscriptionId } = req.params;
    
    // In a real app, you would verify that the subscription belongs to the authenticated user
    
    const success = weatherAlertsService.unsubscribeFromWeatherAlerts(subscriptionId);
    
    if (!success) {
      return res.status(404).json({ success: false, message: 'Subscription not found' });
    }
    
    res.json({ success: true, message: 'Successfully unsubscribed from weather alerts' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

/**
 * @route GET /api/weather/alerts/user/:userId
 * @desc Get user's weather alert subscriptions
 * @access Private
 */
router.get('/alerts/user/:userId', (req, res) => {
  try {
    const { userId } = req.params;
    
    // In a real app, you would verify that the authenticated user matches userId
    
    const subscriptions = weatherAlertsService.getUserWeatherSubscriptions(userId);
    res.json({ success: true, subscriptions });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

/**
 * @route POST /api/weather/alerts/generate
 * @desc Manually trigger smart alerts generation (admin only)
 * @access Private/Admin
 */
router.post('/alerts/generate', async (req, res) => {
  try {
    // In a real app, you would verify that the user has admin privileges
    
    const alertsSent = await weatherAlertsService.generateSmartAlerts();
    res.json({ success: true, alertsSent });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

/**
 * @route PUT /api/weather/update/:location
 * @desc Update weather data for a location (admin only)
 * @access Private/Admin
 */
router.put('/update/:location', (req, res) => {
  try {
    const { location } = req.params;
    const data = req.body;
    
    // In a real app, you would verify that the user has admin privileges
    
    const success = weatherAlertsService.updateWeatherData(location, data);
    
    if (!success) {
      return res.status(400).json({ success: false, message: 'Invalid weather data format' });
    }
    
    res.json({ success: true, message: `Weather data for ${location} updated successfully` });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;