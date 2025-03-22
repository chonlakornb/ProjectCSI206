import express from 'express';
import connectDB from './config/db.js';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/authRoutes.js';
import bookRoutes from './routes/bookRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import favoriteRoutes from './routes/favoriteRoutes.js'; // Import favorite routes
import reviewRoutes from './routes/reviewRoutes.js'; // Import review routes
import notificationRoutes from './routes/notificationRoutes.js'; // Import notification routes

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

// Connect to MongoDB
await connectDB();

// Use routes
app.use('/api', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api', bookRoutes);
app.use('/api', categoryRoutes);
app.use('/api', favoriteRoutes); // Use favorite routes
app.use('/api', reviewRoutes); // Use review routes
app.use('/api', notificationRoutes); // Use notification routes

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

