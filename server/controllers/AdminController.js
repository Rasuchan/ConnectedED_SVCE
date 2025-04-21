// server/controllers/adminController.js

const Mentor = require('../models/adminModel');

// Admin approves mentor by ID
exports.approveMentor = async (req, res) => {
    const { id } = req.params;

    try {
        const mentor = await Mentor.findById(id);
        if (!mentor) {
            return res.status(404).json({ message: 'Mentor not found' });
        }

        mentor.isApproved = true;  // Mark mentor as approved
        await mentor.save();

        res.json({ message: 'Mentor approved', mentor });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
