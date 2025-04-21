import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
import './AdminPage.css';

const AdminPage = () => {
  const [books, setBooks] = useState([]);
  const [formData, setFormData] = useState({ title: '', author: '', cover_image: '', categories: '', isbn: '', publisher: '', published_year: '' });
  const [editingBookId, setEditingBookId] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true); // Loading state
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log('Fetching books...'); // Debugging log
        const response = await axios.get('http://localhost:3000/api/books', {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log('Books fetched:', response.data); // Debugging log
        setBooks(response.data);
      } catch (error) {
        console.error('Error fetching books:', error); // Debugging log
        setMessage('Failed to fetch books.');
      }
    };

    const checkAdminRole = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log('Checking admin role...'); // Debugging log
        const response = await axios.get('http://localhost:3000/api/users/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log('User role:', response.data.role); // Debugging log
        if (response.data.role !== 'admin') {
          setMessage('Access denied. Redirecting...');
          setTimeout(() => navigate('/'), 2000); // Redirect non-admin users
        } else {
          await fetchBooks(); // Fetch books only if the user is an admin
        }
      } catch (error) {
        console.error('Error checking admin role:', error); // Debugging log
        setMessage('Invalid session. Redirecting...');
        setTimeout(() => navigate('/'), 2000); // Redirect if token is invalid
      } finally {
        setLoading(false); // Ensure loading is set to false
      }
    };

    checkAdminRole();
  }, [navigate]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddOrEditBook = async () => {
    try {
      const token = localStorage.getItem('token');
      console.log('Saving book:', formData); // Debugging log
      if (!formData.isbn || !formData.title) {
        setMessage('ISBN and Title are required.');
        return;
      }

      let category_id = null;
      if (formData.categories) {
        console.log('Creating category:', formData.categories); // Debugging log
        const categoryResponse = await axios.post(
          'http://localhost:3000/api/categories',
          { name: formData.categories },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        category_id = categoryResponse.data.id;
        console.log('Category created with ID:', category_id); // Debugging log
      }

      const bookData = { ...formData, category_id };
      if (editingBookId) {
        console.log('Updating book with ID:', editingBookId); // Debugging log
        await axios.put(
          `http://localhost:3000/api/books/${editingBookId}`,
          bookData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setMessage('Book updated successfully!');
      } else {
        console.log('Adding new book:', bookData); // Debugging log
        await axios.post('http://localhost:3000/api/books', bookData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMessage('Book added successfully!');
      }

      setFormData({ title: '', author: '', cover_image: '', categories: '', isbn: '', publisher: '', published_year: '' });
      setEditingBookId(null);

      const updatedBooks = await axios.get('http://localhost:3000/api/books', {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log('Books after save:', updatedBooks.data); // Debugging log
      setBooks(updatedBooks.data);
    } catch (error) {
      console.error('Error saving book:', error); // Debugging log
      setMessage(error.response?.data?.message || 'Failed to save book.');
    }
  };

  const handleEditClick = (book) => {
    console.log('Editing book:', book); // Debugging log
    setFormData({ ...book, categories: book.category_id });
    setEditingBookId(book.book_id);
  };

  const handleDeleteBook = async (book_id) => {
    try {
      const token = localStorage.getItem('token');
      console.log('Deleting book with ID:', book_id); // Debugging log
      await axios.delete(`http://localhost:3000/api/books/${book_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBooks(books.filter((book) => book.book_id !== book_id));
      setMessage('Book deleted successfully!');
    } catch (error) {
      console.error('Error deleting book:', error); // Debugging log
      setMessage(error.response?.data?.message || 'Failed to delete book.');
    }
  };

  if (loading) {
    return <p>Loading...</p>; // Display loading message while checking role
  }

  return (
    <div className="admin-page" id="admin">
      <Navbar />
      <h1>Admin Panel</h1>
      {message && <p className="message">{message}</p>}
      <div className="form-container">
        <h2>{editingBookId ? 'Edit Book' : 'Add Book'}</h2>
        <input
          id="book-title"
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleInputChange}
        />
        <input
          id="book-author"
          type="text"
          name="author"
          placeholder="Author"
          value={formData.author}
          onChange={handleInputChange}
        />
        <input
          id="book-cover-image"
          type="text"
          name="cover_image"
          placeholder="Cover Image URL"
          value={formData.cover_image}
          onChange={handleInputChange}
        />
        <input
          id="book-categories"
          type="text"
          name="categories"
          placeholder="Categories (comma-separated)"
          value={formData.categories}
          onChange={handleInputChange}
        />
        <input
          id="book-isbn"
          type="text"
          name="isbn"
          placeholder="ISBN"
          value={formData.isbn}
          onChange={handleInputChange}
        />
        <input
          id="book-publisher"
          type="text"
          name="publisher"
          placeholder="Publisher"
          value={formData.publisher}
          onChange={handleInputChange}
        />
        <input
          id="book-published-year"
          type="text"
          name="published_year"
          placeholder="Published Year"
          value={formData.published_year}
          onChange={handleInputChange}
        />
        <button id="add-edit-book-btn" onClick={handleAddOrEditBook}>
          {editingBookId ? 'Update Book' : 'Add Book'}
        </button>
      </div>
      <div className="books-table">
        <h2>Books List</h2>
        {books.length === 0 ? (
          <p>No books available. Add a new book to get started.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Cover</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr key={book.book_id}>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td><img src={book.cover_image} alt={book.title} width="50" /></td>
                  <td>
                    <button id={`edit-book-${book.book_id}`} onClick={() => handleEditClick(book)}>Edit</button>
                    <button id={`delete-book-${book.book_id}`} onClick={() => handleDeleteBook(book.book_id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
