import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  isbn: { type: String, required: true },
  author: { type: String, required: true },
  publisher: { type: String, required: true },
  published_year: { type: Number, required: true },
  category: { type: String, required: true },
  cover_image: { type: String, required: true },
  pdf_file: { type: String, default: null },
  created_at: { type: Date, default: Date.now }
});

const Book = mongoose.model('Book', bookSchema);

export default Book;
