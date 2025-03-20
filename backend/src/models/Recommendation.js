import mongoose from 'mongoose';

const recommendationSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  book_id: { type: String, required: true },
  reason: { type: String, required: true },
  created_at: { type: Date, default: Date.now }
});

const Recommendation = mongoose.model('Recommendation', recommendationSchema);

export default Recommendation;
