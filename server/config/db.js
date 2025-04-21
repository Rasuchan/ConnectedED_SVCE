const mongoose = require('mongoose');
require('dotenv').config();  // Load environment variables from .env

// Get the Mongo URI from the environment variables
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/Connected_SVCE';

// Function to connect to MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB Connected');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);  // Exit the process if we can't connect to DB
    }
};

module.exports = connectDB;
