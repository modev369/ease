import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import connectDB from './config/database';
import authRoutes from './routes/authRoutes';
import { errorHandler } from './middleware/errorHandler';
import { logger, morganStream } from './utils/logger';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env file in the root directory
dotenv.config({ 
    path: path.resolve(__dirname, '../.env') 
  });
  
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Logging middleware
app.use(morgan('combined', { stream: morganStream }));

// Routes
app.use('/api/auth', authRoutes);

// Error Handling (must be last)
app.use(errorHandler);

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});