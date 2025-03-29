import mongoose from 'mongoose';

const favoriteSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  book_id: { type: String, required: true },
  created_at: { type: Date, default: Date.now }
});

const Favorite = mongoose.model('Favorite', favoriteSchema);

export default Favorite;
