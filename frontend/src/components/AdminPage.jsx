import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar'; // Optional: Add Navbar for navigation
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

      // ตรวจสอบว่า 'isbn' มีค่าหรือยัง
      if (!formData.isbn) {
        setMessage('ISBN is required.');
        return;
      }

      // ส่งหมวดหมู่ (categories) ไปยัง API /api/categories ก่อน
      if (formData.categories) {
        try {
          await axios.post('http://localhost:3000/api/categories', {
            name: formData.categories
          }, {
            headers: { Authorization: `Bearer ${token}` }
          });
        } catch (error) {
          if (error.response && error.response.data && error.response.data.message) {
            setMessage(`Failed to save category: ${error.response.data.message}`);
          } else {
            setMessage('Failed to save category. Please try again later.');
          }
          return; // หยุดการทำงานถ้าการส่งข้อมูล categories ล้มเหลว
        }
      }

      // ถ้ากำลังแก้ไขหนังสือ (update)
      if (editingBookId) {
        await axios.put(
          `http://localhost:3000/api/books/${editingBookId}`,
          { ...formData },
          { headers: { Authorization: `Bearer ${token}` }
        });
        setMessage('Book updated successfully!');
      } else {
        // เพิ่มหนังสือใหม่
        await axios.post('http://localhost:3000/api/books', { ...formData }, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMessage('Book added successfully!');
      }

      // รีเซ็ตฟอร์ม
      setFormData({ title: '', author: '', cover_image: '', categories: '', isbn: '', publisher: '', published_year: '', price: '' });
      setEditingBookId(null);

      // รีเฟรชรายการหนังสือ
      const updatedBooks = await axios.get('http://localhost:3000/api/books', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBooks(updatedBooks.data);

    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setMessage(`Failed to save book: ${error.response.data.message}`);
      } else {
        setMessage('Failed to save book. Please try again later.');
      }
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
                <td><img src={book.cover_image} alt={book.title} width="50" /></td>
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
