const express = require('express');
const router = express.Router();
const dashboardService = require('../services/dashboard-service');

/**
 * @route GET /api/dashboard/records/:userId
 * @desc Get all farm records for a user
 * @access Private
 */
router.get('/records/:userId', (req, res) => {
  try {
    const { userId } = req.params;
    
    // In a real app, you would verify that the authenticated user matches userId
    
    const records = dashboardService.getUserFarmRecords(userId);
    res.json({ success: true, records });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

/**
 * @route GET /api/dashboard/record/:recordId
 * @desc Get a specific farm record by ID
 * @access Private
 */
router.get('/record/:recordId', (req, res) => {
  try {
    const { recordId } = req.params;
    
    // In a real app, you would verify that the record belongs to the authenticated user
    
    const record = dashboardService.getFarmRecordById(recordId);
    
    if (!record) {
      return res.status(404).json({ success: false, message: 'Farm record not found' });
    }
    
    res.json({ success: true, record });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

/**
 * @route GET /api/dashboard/crop/:cropId
 * @desc Get a specific crop record by ID
 * @access Private
 */
router.get('/crop/:cropId', (req, res) => {
  try {
    const { cropId } = req.params;
    
    // In a real app, you would verify that the crop belongs to the authenticated user
    
    const crop = dashboardService.getCropRecordById(cropId);
    
    if (!crop) {
      return res.status(404).json({ success: false, message: 'Crop record not found' });
    }
    
    res.json({ success: true, crop });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

/**
 * @route POST /api/dashboard/record
 * @desc Create a new farm record
 * @access Private
 */
router.post('/record', (req, res) => {
  try {
    const record = req.body;
    
    // In a real app, you would get the userId from the authenticated user
    if (!record.userId) {
      record.userId = req.headers['x-user-id'] || 'demo-user';
    }
    
    const newRecord = dashboardService.createFarmRecord(record);
    res.status(201).json({ success: true, record: newRecord });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

/**
 * @route POST /api/dashboard/record/:recordId/crop
 * @desc Add a crop to a farm record
 * @access Private
 */
router.post('/record/:recordId/crop', (req, res) => {
  try {
    const { recordId } = req.params;
    const crop = req.body;
    
    // In a real app, you would verify that the record belongs to the authenticated user
    
    const updatedRecord = dashboardService.addCropToRecord(recordId, crop);
    res.status(201).json({ success: true, record: updatedRecord });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

/**
 * @route PUT /api/dashboard/crop/:cropId
 * @desc Update a crop record
 * @access Private
 */
router.put('/crop/:cropId', (req, res) => {
  try {
    const { cropId } = req.params;
    const updates = req.body;
    
    // In a real app, you would verify that the crop belongs to the authenticated user
    
    const updatedCrop = dashboardService.updateCropRecord(cropId, updates);
    
    if (!updatedCrop) {
      return res.status(404).json({ success: false, message: 'Crop record not found' });
    }
    
    res.json({ success: true, crop: updatedCrop });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

/**
 * @route POST /api/dashboard/crop/:cropId/expense
 * @desc Add an expense to a crop
 * @access Private
 */
router.post('/crop/:cropId/expense', (req, res) => {
  try {
    const { cropId } = req.params;
    const expense = req.body;
    
    // In a real app, you would verify that the crop belongs to the authenticated user
    
    const updatedCrop = dashboardService.addExpenseToCrop(cropId, expense);
    
    if (!updatedCrop) {
      return res.status(404).json({ success: false, message: 'Crop record not found' });
    }
    
    res.status(201).json({ success: true, crop: updatedCrop });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

/**
 * @route POST /api/dashboard/crop/:cropId/income
 * @desc Add income to a crop
 * @access Private
 */
router.post('/crop/:cropId/income', (req, res) => {
  try {
    const { cropId } = req.params;
    const income = req.body;
    
    // In a real app, you would verify that the crop belongs to the authenticated user
    
    const updatedCrop = dashboardService.addIncomeToCrop(cropId, income);
    
    if (!updatedCrop) {
      return res.status(404).json({ success: false, message: 'Crop record not found' });
    }
    
    res.status(201).json({ success: true, crop: updatedCrop });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

/**
 * @route POST /api/dashboard/crop/:cropId/activity
 * @desc Add an activity to a crop
 * @access Private
 */
router.post('/crop/:cropId/activity', (req, res) => {
  try {
    const { cropId } = req.params;
    const activity = req.body;
    
    // In a real app, you would verify that the crop belongs to the authenticated user
    
    const updatedCrop = dashboardService.addActivityToCrop(cropId, activity);
    
    if (!updatedCrop) {
      return res.status(404).json({ success: false, message: 'Crop record not found' });
    }
    
    res.status(201).json({ success: true, crop: updatedCrop });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

/**
 * @route DELETE /api/dashboard/record/:recordId
 * @desc Delete a farm record
 * @access Private
 */
router.delete('/record/:recordId', (req, res) => {
  try {
    const { recordId } = req.params;
    
    // In a real app, you would verify that the record belongs to the authenticated user
    
    const success = dashboardService.deleteFarmRecord(recordId);
    
    if (!success) {
      return res.status(404).json({ success: false, message: 'Farm record not found' });
    }
    
    res.json({ success: true, message: 'Farm record deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

/**
 * @route DELETE /api/dashboard/record/:recordId/crop/:cropId
 * @desc Delete a crop from a farm record
 * @access Private
 */
router.delete('/record/:recordId/crop/:cropId', (req, res) => {
  try {
    const { recordId, cropId } = req.params;
    
    // In a real app, you would verify that the record belongs to the authenticated user
    
    const success = dashboardService.deleteCropFromRecord(recordId, cropId);
    
    if (!success) {
      return res.status(404).json({ success: false, message: 'Record or crop not found' });
    }
    
    res.json({ success: true, message: 'Crop deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

/**
 * @route GET /api/dashboard/statistics/:userId
 * @desc Get summary statistics for a user
 * @access Private
 */
router.get('/statistics/:userId', (req, res) => {
  try {
    const { userId } = req.params;
    
    // In a real app, you would verify that the authenticated user matches userId
    
    const statistics = dashboardService.getUserStatistics(userId);
    res.json({ success: true, statistics });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;