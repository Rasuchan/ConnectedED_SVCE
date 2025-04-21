// server/routes/menteeRoutes.js

const express = require('express');
const router = express.Router();
const menteeController = require('../controllers/menteeController');

// Mentee signup
router.post('/signup', menteeController.signupMentee);

// Mentee login
router.post('/login', menteeController.loginMentee);

module.exports = router;
