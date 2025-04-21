const mongoose = require('mongoose');

// Mentor schema
const mentorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    qualifications: {
        type: String,
        required: true,  // You can change this based on your requirement
    },
    mentorId: {
        type: String,
        required: true,
        unique: true,
    },
    isApproved: {
        type: Boolean,
        default: false,  // Default to false until admin approves
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Mentor', mentorSchema);
