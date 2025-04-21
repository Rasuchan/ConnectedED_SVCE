// server/controllers/menteeController.js

const Mentee = require('../models/menteeModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Mentee signup
exports.signupMentee = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const menteeExists = await Mentee.findOne({ email });
        if (menteeExists) {
            return res.status(400).json({ message: 'Mentee already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newMentee = new Mentee({
            name,
            email,
            password: hashedPassword
        });

        await newMentee.save();
        res.status(201).json({ message: 'Mentee created successfully', mentee: newMentee });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Mentee login
exports.loginMentee = async (req, res) => {
    const { email, password } = req.body;

    try {
        const mentee = await Mentee.findOne({ email });
        if (!mentee) {
            return res.status(400).json({ message: 'Mentee not found' });
        }

        const match = await bcrypt.compare(password, mentee.password);
        if (!match) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ menteeId: mentee._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ message: 'Login successful', token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
