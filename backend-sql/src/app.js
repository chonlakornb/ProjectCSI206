import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js'; // Import connectDB

import userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/authRoutes.js';
import bookRoutes from './routes/bookRoutes.js';
import favoriteRoutes from './routes/favoriteRoutes.js';
import notificationRoutes from './routes/notificationRoutes.js';
import recommendationRoutes from './routes/recommendationRoutes.js'; // Import recommendation routes

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

// Connect to the database
connectDB();

// Use routes
app.use('/api', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api', bookRoutes);
// app.use('/api', categoryRoutes);
app.use('/api', favoriteRoutes);
app.use('/api', notificationRoutes);
app.use('/api', recommendationRoutes); // Use recommendation routes

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

