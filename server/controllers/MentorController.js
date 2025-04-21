// server/controllers/mentorController.js

const Mentor = require('../models/mentorModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Signup mentor
exports.signupMentor = async (req, res) => {
    const { name, email, password, qualifications } = req.body;

    try {
        // Check if mentor already exists
        const mentorExists = await Mentor.findOne({ email });
        if (mentorExists) {
            return res.status(400).json({ message: 'Mentor already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new mentor
        const newMentor = new Mentor({
            name,
            email,
            password: hashedPassword,
            qualifications,
            mentorId: `M${Date.now()}`
        });

        // Save mentor to DB
        await newMentor.save();

        res.status(201).json({ message: 'Mentor created successfully', mentor: newMentor });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Login mentor
exports.loginMentor = async (req, res) => {
    const { email, password } = req.body;

    try {
        const mentor = await Mentor.findOne({ email });
        if (!mentor) {
            return res.status(400).json({ message: 'Mentor not found' });
        }

        // Compare passwords
        const match = await bcrypt.compare(password, mentor.password);
        if (!match) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Create JWT token
        const token = jwt.sign({ mentorId: mentor._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ message: 'Login successful', token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Upload mentor documents
exports.uploadDocuments = async (req, res) => {
    try {
        const documents = req.files.map(file => file.path);
        res.json({ message: 'Documents uploaded successfully', documents });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error uploading documents' });
    }
};

// Approve mentor (admin feature)
exports.approveMentor = async (req, res) => {
    const { id } = req.params;

    try {
        const mentor = await Mentor.findById(id);
        if (!mentor) {
            return res.status(404).json({ message: 'Mentor not found' });
        }

        // Approve mentor
        mentor.isApproved = true;
        await mentor.save();

        res.json({ message: 'Mentor approved successfully', mentor });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
