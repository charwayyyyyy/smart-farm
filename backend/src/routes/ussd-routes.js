const express = require('express');
const router = express.Router();
const { processUSSD } = require('../services/ussd-service');

// USSD endpoint
router.post('/ussd', processUSSD);

module.exports = router;