import express from 'express';
import connectDB from './config/db.js';
import cors from 'cors';

const app = express();
const PORT = 3000;

app.use(express.json());

// Connect to MongoDB
await connectDB();

// ...existing code...


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

