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
    res.json(books);
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
    res.json(books[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addBook = async (req, res) => {
  const { title, isbn, author, publisher, published_year, categories, cover_image, pdf_file } = req.body;

  try {
    // Log the input data for debugging
    console.log('Request Body:', req.body);
    console.log('Categories:', categories);

    // Validate categories
    if (!categories || typeof categories !== 'string' || categories.trim() === '') {
      console.error('Invalid categories value:', categories);
      return res.status(400).json({ message: 'Invalid categories value. It must be a non-empty string.' });
    }

    // Log the query and parameters for debugging
    console.log('Query:', 'INSERT INTO books (`title`, `isbn`, `author`, `publisher`, `published_year`, `categories`, `cover_image`, `pdf_file`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)');
    console.log('Parameters:', [title, isbn, author, publisher, published_year, categories, cover_image, pdf_file]);

    await pool.query(
      'INSERT INTO books (`title`, `isbn`, `author`, `publisher`, `published_year`, `categories`, `cover_image`, `pdf_file`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [title, isbn, author, publisher, published_year, categories, cover_image, pdf_file]
    );
    res.status(201).json({ message: 'Book added successfully' });
  } catch (error) {
    console.error('Error adding book:', error.message);
    res.status(500).json({ message: error.message });
  }
};

export const updateBookById = async (req, res) => {
  const { title, isbn, author, publisher, published_year, categories, cover_image, pdf_file } = req.body;

  try {
    const [books] = await pool.query('SELECT * FROM books WHERE id = ?', [req.params.id]);
    if (books.length === 0) {
      return res.status(404).json({ message: 'Book not found' });
    }

    await pool.query(
      'UPDATE books SET title = ?, isbn = ?, author = ?, publisher = ?, published_year = ?, cover_image = ?, pdf_file = ? WHERE id = ?',
      [title, isbn, author, publisher, published_year, cover_image, pdf_file, req.params.id]
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
      'SELECT * FROM books WHERE title LIKE ? OR author LIKE ? OR categories LIKE ?',
      [`%${query}%`, `%${query}%`, `%${query}%`]
    );
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const filterBooks = async (req, res) => {
  const { categories, year } = req.query;

  try {
    const conditions = [];
    const values = [];

    if (categories) {
      conditions.push('categories = ?');
      values.push(categories);
    }
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
