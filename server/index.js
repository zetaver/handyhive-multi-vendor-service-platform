import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { initializeSocket } from './socket.js';
import connectDB from './config/database.js';
import { errorHandler } from './middleware/errorHandler.js';
import path from 'path';

// Import routes
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import serviceRoutes from './routes/services.js';
import bookingRoutes from './routes/bookings.js';
import reportRoutes from './routes/reports.js';
import categoryRoutes from './routes/categories.js';
import mediaRoutes from './routes/media.js';

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();
const httpServer = createServer(app);

// Initialize Socket.IO
initializeSocket(httpServer);

// Connect to database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files
app.use('/storage', express.static(path.join(process.cwd(), 'storage')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/media', mediaRoutes);

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});