const mongoose = require('mongoose');

let isConnected = false;

const connectDB = async () => {
  if (isConnected) return; // Reuse existing connection
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: 'auth-app', // optional but good practice
    });
    isConnected = conn.connections[0].readyState;
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
};

module.exports = connectDB;
