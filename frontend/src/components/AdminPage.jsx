import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar'; // Optional: Add Navbar for navigation
import './AdminPage.css';

const AdminPage = () => {
  const [books, setBooks] = useState([]);
  const [formData, setFormData] = useState({ title: '', author: '', cover_image: '' });
  const [editingBookId, setEditingBookId] = useState(null);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3000/api/books', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBooks(response.data);
      } catch (error) {
        setMessage('Failed to fetch books.');
      }
    };

    const checkAdminRole = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3000/api/users/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.data.role !== 'admin') {
          navigate('/'); // Redirect non-admin users
        }
      } catch (error) {
        navigate('/'); // Redirect if token is invalid
      }
    };

    checkAdminRole();
    fetchBooks();
  }, [navigate]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddOrEditBook = async () => {
    try {
      const token = localStorage.getItem('token');
      if (editingBookId) {
        await axios.put(
          `http://localhost:3000/api/books/${editingBookId}`,
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setMessage('Book updated successfully!');
      } else {
        await axios.post('http://localhost:3000/api/books', formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMessage('Book added successfully!');
      }
      setFormData({ title: '', author: '', cover_image: '' });
      setEditingBookId(null);
      const updatedBooks = await axios.get('http://localhost:3000/api/books', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBooks(updatedBooks.data);
    } catch (error) {
      setMessage('Failed to save book.');
    }
  };

  const handleEditClick = (book) => {
    setFormData(book);
    setEditingBookId(book.id);
  };

  const handleDeleteBook = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:3000/api/books/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBooks(books.filter((book) => book.id !== id));
      setMessage('Book deleted successfully!');
    } catch (error) {
      setMessage('Failed to delete book.');
    }
  };

  return (
    <div className="admin-page" id='admin'>
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
        <button id="add-edit-book-btn" onClick={handleAddOrEditBook}>
          {editingBookId ? 'Update Book' : 'Add Book'}
        </button>
      </div>
      <div className="books-table">
        <h2>Books List</h2>
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
              <tr key={book.id}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td><img src={book.cover_image} alt={book.title} width="50" /></td>
                <td><button id={`edit-book-${book.id}`} onClick={() => handleEditClick(book)}>Edit</button><button id={`delete-book-${book.id}`} onClick={() => handleDeleteBook(book.id)}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPage;
