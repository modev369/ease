import express, { Application, Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

// Remove unused import
// import User from './models/User';

// Import routes
import authRoutes from './routes/authRoutes';

// Load environment variables
dotenv.config();

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.connectToDatabase();
    this.initializeMiddlewares();
    this.initializeRoutes();
    this.initializeErrorHandling();
  }

  // ... rest of the code remains the same
}

// Create and start the application
const app = new App();
app.startServer(parseInt(process.env.PORT || '3000'));

export default app;