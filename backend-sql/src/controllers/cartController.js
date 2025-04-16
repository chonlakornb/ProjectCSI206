import { pool } from '../config/db.js';

export const getCartItems = async (req, res) => {
  try {
    // Use 'book_id' instead of 'id' in the ON clause
    const [cartItems] = await pool.query(
      `SELECT c.cart_id, c.user_id, c.book_id, b.title, b.author, b.price, c.quantity 
       FROM cart c 
       JOIN books b ON c.book_id = b.book_id 
       WHERE c.user_id = ?`,
      [req.user.id]
    );

    res.json(cartItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addToCart = async (req, res) => {
  const { book_id, quantity } = req.body;

  try {
    // Check if the book exists
    const [books] = await pool.query('SELECT * FROM books WHERE book_id = ?', [book_id]);
    if (books.length === 0) {
      return res.status(404).json({ message: 'Book not found' });
    }

    // Check if the book is already in the user's cart
    const [existingCartItem] = await pool.query(
      'SELECT * FROM cart WHERE user_id = ? AND book_id = ?',
      [req.user.id, book_id]
    );

    if (existingCartItem.length > 0) {
      // Update the quantity if the book is already in the cart
      await pool.query(
        'UPDATE cart SET quantity = quantity + ? WHERE user_id = ? AND book_id = ?',
        [quantity, req.user.id, book_id]
      );
      return res.json({ message: 'Book quantity updated in cart' });
    }

    // Add the book to the cart
    await pool.query(
      'INSERT INTO cart (user_id, book_id, quantity) VALUES (?, ?, ?)',
      [req.user.id, book_id, quantity]
    );

    res.status(201).json({ message: 'Book added to cart successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
