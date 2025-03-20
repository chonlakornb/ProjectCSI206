import Book from '../models/book.js';

export const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addBook = async (req, res) => {
  const { title, isbn, author, publisher, published_year, category, cover_image, pdf_file } = req.body;

  try {
    const newBook = new Book({
      title,
      isbn,
      author,
      publisher,
      published_year,
      category,
      cover_image,
      pdf_file,
    });

    await newBook.save();
    res.status(201).json({ message: 'Book added successfully', book: newBook });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateBookById = async (req, res) => {
  const { title, isbn, author, publisher, published_year, category, cover_image, pdf_file } = req.body;

  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    if (title) book.title = title;
    if (isbn) book.isbn = isbn;
    if (author) book.author = author;
    if (publisher) book.publisher = publisher;
    if (published_year) book.published_year = published_year;
    if (category) book.category = category;
    if (cover_image) book.cover_image = cover_image;
    if (pdf_file) book.pdf_file = pdf_file;

    await book.save();
    res.json({ message: 'Book updated successfully', book });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    await book.deleteOne();
    res.json({ message: 'Book deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const searchBooks = async (req, res) => {
  const { query } = req.query;

  try {
    const books = await Book.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { author: { $regex: query, $options: 'i' } },
        { category: { $regex: query, $options: 'i' } },
      ],
    });
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const filterBooks = async (req, res) => {
  const { category, year } = req.query;

  try {
    const query = {};
    if (category) query.category = category;
    if (year) query.published_year = year;

    const books = await Book.find(query);
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
