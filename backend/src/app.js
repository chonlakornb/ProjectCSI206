import express from 'express';
import connectDB from './config/db.js';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/authRoutes.js';
import bookRoutes from './routes/bookRoutes.js'; // Import book routes

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

// Connect to MongoDB
await connectDB();

// Use routes
app.use('/api', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api', bookRoutes); // Use book routes

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

