// src/config/database.ts
import mongoose from 'mongoose';
import { logger } from '../utils/logger';

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI || '';
    await mongoose.connect(mongoURI, {
      // Updated connection options
      // Remove deprecated options
    });
    logger.info('MongoDB Connected Successfully');
  } catch (error: any) {
    logger.error(`MongoDB Connection Error: ${error.message}`);
    // Exit process with failure
    process.exit(1);
  }
};

// Handle mongoose connection events
mongoose.connection.on('disconnected', () => {
  logger.warn('Lost MongoDB connection');
});

mongoose.connection.on('reconnected', () => {
  logger.info('Reconnected to MongoDB');
});

export default connectDB;