import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  book_id: { type: String, required: true },
  rating: { type: Number, required: true },
  comment: { type: String, required: true },
  created_at: { type: Date, default: Date.now }
});

const Review = mongoose.model('Review', reviewSchema);

export default Review;
