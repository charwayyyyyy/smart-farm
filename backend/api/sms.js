const express = require('express');
const router = express.Router();
const twilio = require('twilio');
const { authenticateToken, isAdmin } = require('../utils/auth');
const User = require('../models/User');
const Crop = require('../models/Crop');
const FarmerSubscription = require('../models/FarmerSubscription');

// Initialize Twilio client
const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

// @route   POST /api/sms/register
// @desc    Register a user via SMS
// @access  Public
router.post('/register', async (req, res) => {
  try {
    const { phone, cropType, location } = req.body;

    // Check if user exists
    let user = await User.findOne({ where: { phone } });

    // If user doesn't exist, create a new one
    if (!user) {
      user = await User.create({
        name: `Farmer-${Date.now()}`, // Temporary name
        email: `${phone}@placeholder.com`, // Placeholder email
        phone,
        password: Math.random().toString(36).slice(-8), // Random password
        location
      });
    }

    // Find the crop by name
    const crop = await Crop.findOne({
      where: { name: cropType }
    });

    if (!crop) {
      return res.status(404).json({ success: false, message: 'Crop type not found' });
    }

    // Create subscription
    const subscription = await FarmerSubscription.create({
      userId: user.id,
      cropId: crop.id,
      plantingDate: new Date(),
      location,
      notificationPreference: 'sms'
    });

    // Send confirmation SMS
    await twilioClient.messages.create({
      body: `Thank you for registering with SmartFarmGH! You will now receive updates for ${cropType} farming in ${location}.`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phone
    });

    res.status(201).json({
      success: true,
      message: 'SMS registration successful',
      subscription
    });
  } catch (error) {
    console.error('SMS registration error:', error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

// @route   POST /api/sms/send
// @desc    Send SMS to a specific user
// @access  Private/Admin
router.post('/send', authenticateToken, isAdmin, async (req, res) => {
  try {
    const { userId, message } = req.body;

    const user = await User.findByPk(userId);
    if (!user || !user.phone) {
      return res.status(404).json({ success: false, message: 'User not found or has no phone number' });
    }

    // Send SMS
    const smsResponse = await twilioClient.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: user.phone
    });

    res.json({
      success: true,
      message: 'SMS sent successfully',
      smsId: smsResponse.sid
    });
  } catch (error) {
    console.error('Send SMS error:', error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

// @route   POST /api/sms/broadcast
// @desc    Send SMS to multiple users based on criteria
// @access  Private/Admin
router.post('/broadcast', authenticateToken, isAdmin, async (req, res) => {
  try {
    const { cropType, location, message } = req.body;

    // Find subscriptions matching criteria
    const query = {};
    if (cropType) {
      const crop = await Crop.findOne({ where: { name: cropType } });
      if (crop) query.cropId = crop.id;
    }
    if (location) query.location = location;

    const subscriptions = await FarmerSubscription.findAll({
      where: query,
      include: [{ model: User, attributes: ['id', 'phone'] }]
    });

    if (subscriptions.length === 0) {
      return res.status(404).json({ success: false, message: 'No matching subscriptions found' });
    }

    // Send SMS to each subscriber
    const smsPromises = subscriptions.map(async (subscription) => {
      if (subscription.User && subscription.User.phone) {
        return twilioClient.messages.create({
          body: message,
          from: process.env.TWILIO_PHONE_NUMBER,
          to: subscription.User.phone
        });
      }
    });

    await Promise.all(smsPromises.filter(Boolean));

    res.json({
      success: true,
      message: `SMS broadcast sent to ${smsPromises.filter(Boolean).length} recipients`
    });
  } catch (error) {
    console.error('SMS broadcast error:', error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

// @route   GET /api/sms/subscriptions
// @desc    Get all subscriptions for a user
// @access  Private
router.get('/subscriptions', authenticateToken, async (req, res) => {
  try {
    const subscriptions = await FarmerSubscription.findAll({
      where: { userId: req.user.id },
      include: [{ model: Crop, attributes: ['id', 'name', 'description', 'imageUrl'] }]
    });

    res.json({
      success: true,
      subscriptions
    });
  } catch (error) {
    console.error('Get subscriptions error:', error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

// @route   POST /api/sms/webhook
// @desc    Webhook for incoming SMS
// @access  Public
router.post('/webhook', async (req, res) => {
  try {
    const { From, Body } = req.body;
    const phone = From;
    const message = Body.trim().toLowerCase();

    // Simple command parsing
    if (message.startsWith('register')) {
      // Format: register [crop] [location]
      const parts = message.split(' ');
      if (parts.length >= 3) {
        const cropType = parts[1];
        const location = parts.slice(2).join(' ');

        // Find the crop
        const crop = await Crop.findOne({
          where: { name: cropType }
        });

        if (!crop) {
          // Send error SMS
          await twilioClient.messages.create({
            body: `Sorry, we couldn't find crop type "${cropType}". Please try again with a valid crop type.`,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: phone
          });
          return res.status(200).end();
        }

        // Check if user exists
        let user = await User.findOne({ where: { phone } });

        // If user doesn't exist, create a new one
        if (!user) {
          user = await User.create({
            name: `Farmer-${Date.now()}`,
            email: `${phone.replace(/[^0-9]/g, '')}@placeholder.com`,
            phone,
            password: Math.random().toString(36).slice(-8),
            location
          });
        }

        // Create subscription
        await FarmerSubscription.create({
          userId: user.id,
          cropId: crop.id,
          plantingDate: new Date(),
          location,
          notificationPreference: 'sms'
        });

        // Send confirmation SMS
        await twilioClient.messages.create({
          body: `Thank you for registering with SmartFarmGH! You will now receive updates for ${cropType} farming in ${location}.`,
          from: process.env.TWILIO_PHONE_NUMBER,
          to: phone
        });
      } else {
        // Send error SMS
        await twilioClient.messages.create({
          body: 'To register, please use the format: register [crop] [location]. Example: register maize accra',
          from: process.env.TWILIO_PHONE_NUMBER,
          to: phone
        });
      }
    } else if (message === 'help') {
      // Send help SMS
      await twilioClient.messages.create({
        body: 'SmartFarmGH Commands:\n- register [crop] [location]: Subscribe to crop alerts\n- status: Check your subscriptions\n- help: Show this message',
        from: process.env.TWILIO_PHONE_NUMBER,
        to: phone
      });
    } else if (message === 'status') {
      // Find user
      const user = await User.findOne({ where: { phone } });
      if (!user) {
        await twilioClient.messages.create({
          body: 'You are not registered with SmartFarmGH. Text "register [crop] [location]" to subscribe.',
          from: process.env.TWILIO_PHONE_NUMBER,
          to: phone
        });
        return res.status(200).end();
      }

      // Get subscriptions
      const subscriptions = await FarmerSubscription.findAll({
        where: { userId: user.id },
        include: [{ model: Crop, attributes: ['name'] }]
      });

      if (subscriptions.length === 0) {
        await twilioClient.messages.create({
          body: 'You have no active crop subscriptions. Text "register [crop] [location]" to subscribe.',
          from: process.env.TWILIO_PHONE_NUMBER,
          to: phone
        });
      } else {
        const subList = subscriptions.map(sub => 
          `- ${sub.Crop.name} in ${sub.location} (planted: ${new Date(sub.plantingDate).toLocaleDateString()})`
        ).join('\n');
        
        await twilioClient.messages.create({
          body: `Your SmartFarmGH Subscriptions:\n${subList}`,
          from: process.env.TWILIO_PHONE_NUMBER,
          to: phone
        });
      }
    } else {
      // Unknown command
      await twilioClient.messages.create({
        body: 'Sorry, I didn\'t understand that command. Text "help" for available commands.',
        from: process.env.TWILIO_PHONE_NUMBER,
        to: phone
      });
    }

    res.status(200).end();
  } catch (error) {
    console.error('SMS webhook error:', error);
    res.status(200).end(); // Always return 200 to Twilio
  }
});

module.exports = router;