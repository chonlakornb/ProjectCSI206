import React, { useState } from 'react';
import './AddBook.css';

function AddBook() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:5000/books', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, author }),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Book added:', data);
        setTitle('');
        setAuthor('');
      })
      .catch(error => console.error('Error adding book:', error));
  };

  return (
    <div className="addbook-container">
      <h2>Add New Book</h2>
      <form className="addbook-form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="addbook-input"
          placeholder="Book Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          className="addbook-input"
          placeholder="Book Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <button className="addbook-submit-btn" type="submit">Add Book</button>
      </form>
    </div>
  );
}

export default AddBook;
