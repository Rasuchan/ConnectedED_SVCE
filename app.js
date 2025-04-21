const express = require('express');
const connectDB = require('./server/config/db');  // Import the MongoDB connection function
const dotenv = require('dotenv');
const app = express();
const mentorRoutes = require('./server/routes/MentorRoute');
const menteeRoutes = require('./server/routes/MenteeRoute');
const adminRoutes = require('./server/routes/adminRoutes');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Middleware to parse JSON request bodies
app.use(express.json());

// Routes for different functionalities
app.use('/api/mentors', mentorRoutes);
app.use('/api/mentees', menteeRoutes);
app.use('/api/admin', adminRoutes);

// Set up the port and start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
