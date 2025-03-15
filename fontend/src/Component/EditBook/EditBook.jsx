import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './EditBook.css';

function EditBook() {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');

  useEffect(() => {
    fetch(`http://localhost:5000/books/${id}`)
      .then(response => response.json())
      .then(data => {
        setTitle(data.title);
        setAuthor(data.author);
      })
      .catch(error => console.error('Error fetching book:', error));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:5000/books/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, author }),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Book updated:', data);
      })
      .catch(error => console.error('Error updating book:', error));
  };

  return (
    <div className="editbook-container">
      <h2>Edit Book</h2>
      <form className="editbook-form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="editbook-input"
          placeholder="Book Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          className="editbook-input"
          placeholder="Book Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <button className="editbook-submit-btn" type="submit">Save Changes</button>
      </form>
    </div>
  );
}

export default EditBook;
