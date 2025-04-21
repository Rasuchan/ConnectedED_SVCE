// server/routes/mentorRoutes.js

const express = require('express');
const router = express.Router();
const mentorController = require('../controllers/mentorController');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // Basic file upload configuration

// Mentor signup
router.post('/signup', mentorController.signupMentor);

// Mentor login
router.post('/login', mentorController.loginMentor);

// Mentor document upload
router.post('/upload', upload.array('documents', 5), mentorController.uploadDocuments);  // 'documents' is the field name in the form

// Admin approval of Mentor ID
router.patch('/approve/:id', mentorController.approveMentor);  // Approve mentor by ID

module.exports = router;
