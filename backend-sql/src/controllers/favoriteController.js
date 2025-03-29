import Favorite from '../models/Favorite.js';
import Book from '../models/book.js';

export const getFavorites = async (req, res) => {
  try {
    const favorites = await Favorite.find({ user_id: req.user.id }).populate('book_id');
    const detailedFavorites = await Promise.all(
      favorites.map(async (favorite) => {
        const book = await Book.findById(favorite.book_id);
        return {
          ...favorite.toObject(),
          book,
        };
      })
    );
    res.json(detailedFavorites);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addFavorite = async (req, res) => {
  const { bookId } = req.params;

  try {
    const existingFavorite = await Favorite.findOne({ user_id: req.user.id, book_id: bookId });
    if (existingFavorite) {
      return res.status(400).json({ message: 'Book is already in favorites' });
    }

    const newFavorite = new Favorite({
      user_id: req.user.id,
      book_id: bookId,
    });

    await newFavorite.save();
    res.status(201).json({ message: 'Book added to favorites', favorite: newFavorite });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const removeFavorite = async (req, res) => {
  const { bookId } = req.params;

  try {
    const favorite = await Favorite.findOneAndDelete({ user_id: req.user.id, book_id: bookId });
    if (!favorite) {
      return res.status(404).json({ message: 'Book not found in favorites' });
    }

    res.json({ message: 'Book removed from favorites' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
