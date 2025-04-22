import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AdminNavbar from './AdminNavbar'; // Replace Navbar with AdminNavbar
import './AdminPage.css';

const AdminPage = () => {
  const [books, setBooks] = useState([]);
  const [formData, setFormData] = useState({ title: '', author: '', cover_image: '', categories: '', isbn: '', publisher: '', published_year: '', price: '' });
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
        setBooks(response.data); // Ensure this matches the structure of the Postman API response
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

  const createFormData = (data) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });
    return formData;
  };

  const handleAddOrEditBook = async () => {
    try {
      const token = localStorage.getItem('token');
      const formDataToSend = createFormData(formData);

      const config = { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' } };

      if (editingBookId) {
        await axios.put(`http://localhost:3000/api/books/${editingBookId}`, formDataToSend, config);
        setMessage('Book updated successfully!');
      } else {
        await axios.post('http://localhost:3000/api/books', formDataToSend, config);
        setMessage('Book added successfully!');
      }

      setFormData({ title: '', author: '', cover_image: '', categories: '', isbn: '', publisher: '', published_year: '', price: '' });
      setEditingBookId(null);

      const updatedBooks = await axios.get('http://localhost:3000/api/books', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBooks(updatedBooks.data);

    } catch (error) {
      console.error('Error saving book:', error.response?.data || error.message);
      setMessage(error.response?.data?.message || 'Failed to save book.');
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
      <AdminNavbar /> {/* Use AdminNavbar */}
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
          type="file"
          name="cover_image" // Ensure this matches the backend field name
          onChange={(e) => {
            const file = e.target.files[0];
            setFormData({ ...formData, cover_image: file });
            if (file) {
              const reader = new FileReader();
              reader.onload = (event) => {
                document.getElementById('preview-image').src = event.target.result;
              };
              reader.readAsDataURL(file);
            }
          }}
        />
        <img
          id="preview-image"
          src={formData.cover_image instanceof File ? '' : formData.cover_image}
          alt="Preview"
          style={{ width: '100px', marginTop: '10px', display: formData.cover_image ? 'block' : 'none' }}
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
        <input
          id="book-price"
          type="text"
          name="price"
          placeholder="Price"
          value={formData.price}
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
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.id}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>
                  <img
                    src={
                      typeof book.cover_image === 'string' && book.cover_image.startsWith('http')
                        ? book.cover_image
                        : `http://localhost:3000/${book.cover_image}`
                    }
                    alt={book.title}
                    width="50"
                  />
                </td>
                <td>{book.price}</td>
                <td>
                  <button id={`edit-book-${book.id}`} onClick={() => handleEditClick(book)}>Edit</button>
                  <button id={`delete-book-${book.id}`} onClick={() => handleDeleteBook(book.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPage;
