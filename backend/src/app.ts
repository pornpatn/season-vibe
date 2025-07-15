import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import apiRoutes from './routes';

dotenv.config();

const app = express();

// Middleware
const allowedOrigins = process.env.CORS_ORIGIN?.split(',') || ['http://localhost:5173'];
app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api', apiRoutes);

export default app;