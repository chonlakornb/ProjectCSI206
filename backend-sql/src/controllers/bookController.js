import mysql from 'mysql2/promise';

// Create a MySQL connection pool
const pool = mysql.createPool({
  host: 'localhost', // Update with your MySQL host
  user: 'root',      // Update with your MySQL username
  password: 'root',  // Update with your MySQL password
  database: 'book_catalog', // Update with your MySQL database name
  charset: 'utf8mb4', // Ensure this is set
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export const getAllBooks = async (req, res) => {
  try {
    const [books] = await pool.query('SELECT * FROM books');
    const updatedBooks = books.map((book) => ({
      ...book,
      cover_image: book.cover_image ? `http://localhost:3000${book.cover_image}` : null,
    }));
    res.json(updatedBooks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getBookById = async (req, res) => {
  try {
    const [books] = await pool.query('SELECT * FROM books WHERE id = ?', [req.params.id]);
    if (books.length === 0) {
      return res.status(404).json({ message: 'Book not found' });
    }
    const book = books[0];
    book.cover_image = book.cover_image ? `http://localhost:3000${book.cover_image}` : null;
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addBook = async (req, res) => {

  const { title, isbn, author, publisher, published_year, categories, pdf_file, price } = req.body;
  const cover_image = req.file ? `/uploads/${req.file.filename}` : null;

  try {
    // Validate required fields
    if (!title || !author || !price) {
      return res.status(400).json({ message: 'Title, author, and price are required.' });
    }

    // Validate categories
    if (!categories || typeof categories !== 'string' || categories.trim() === '') {
      return res.status(400).json({ message: 'Invalid categories value. It must be a non-empty string.' });
    }

    // Insert book into the database
    await pool.query(
      'INSERT INTO books (`title`, `isbn`, `author`, `publisher`, `published_year`, `categories`, `cover_image`, `pdf_file`, `price`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [title, isbn, author, publisher, published_year, categories, cover_image, pdf_file, price]

    );
    res.status(201).json({ message: 'Book added successfully' });
  } catch (error) {
    console.error('Error adding book:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};

export const updateBookById = async (req, res) => {

  const { title, isbn, author, publisher, published_year, categories, pdf_file, price } = req.body;
  const cover_image = req.file ? `/uploads/${req.file.filename}` : null;


  try {
    const [books] = await pool.query('SELECT * FROM books WHERE id = ?', [req.params.id]);
    if (books.length === 0) {
      return res.status(404).json({ message: 'Book not found' });
    }

    await pool.query(
      'UPDATE books SET title = ?, isbn = ?, author = ?, publisher = ?, published_year = ?, categories = ?, cover_image = COALESCE(?, cover_image), pdf_file = ?, price = ? WHERE id = ?',
      [title, isbn, author, publisher, published_year, categories, cover_image, pdf_file, price, req.params.id]
    );
    res.json({ message: 'Book updated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteBookById = async (req, res) => {
  try {
    const [books] = await pool.query('SELECT * FROM books WHERE id = ?', [req.params.id]);
    if (books.length === 0) {
      return res.status(404).json({ message: 'Book not found' });
    }

    await pool.query('DELETE FROM books WHERE id = ?', [req.params.id]);
    res.json({ message: 'Book deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const searchBooks = async (req, res) => {
  const { query } = req.query;

  try {
    const [books] = await pool.query(
      'SELECT * FROM books WHERE title LIKE ? OR author LIKE ?',
      [`%${query}%`, `%${query}%`]
    );
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const filterBooks = async (req, res) => {
  const { year } = req.query;

  try {
    const conditions = [];
    const values = [];

    if (year) {
      conditions.push('published_year = ?');
      values.push(year);
    }

    const query = `SELECT * FROM books ${conditions.length ? 'WHERE ' + conditions.join(' AND ') : ''}`;
    const [books] = await pool.query(query, values);
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
