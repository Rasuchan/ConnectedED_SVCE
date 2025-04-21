// server/routes/adminRoutes.js

const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Admin approves mentor ID (use PATCH method to update approval status)
router.patch('/approve-mentor/:id', adminController.approveMentor);

module.exports = router;
