import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js'; // Import connectDB

import userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/authRoutes.js';
import bookRoutes from './routes/bookRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import favoriteRoutes from './routes/favoriteRoutes.js';
import notificationRoutes from './routes/notificationRoutes.js';
import recommendationRoutes from './routes/recommendationRoutes.js'; // Import recommendation routes
import cartRoutes from './routes/cartRoutes.js'; // Import cart routes
import orderRoutes from './routes/orderRoutes.js'; // Import order routes
import shippingRoutes from './routes/shippingRoutes.js'; // Import shipping routes
import addressRoutes from './routes/addressRoutes.js'; // Import address routes
import paymentRoutes from './routes/paymentRoutes.js'; // Import payment routes
import { authMiddleware } from './middleware/authMiddleware.js'; // Import auth middleware

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
app.use('/api', categoryRoutes);
app.use('/api', favoriteRoutes);
app.use('/api', notificationRoutes);
app.use('/api', recommendationRoutes); // Use recommendation routes
app.use('/api', cartRoutes); // Use cart routes
app.use('/api/orders', orderRoutes); // Use order routes
app.use('/api/shipping', shippingRoutes); // Use shipping routes
app.use('/api/address', addressRoutes); // Ensure this is registered
app.use('/api/payments', paymentRoutes); // Register payment routes

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;

