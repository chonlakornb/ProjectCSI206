import React from 'react';
import './AddBook.css';  // นำเข้า CSS ที่เกี่ยวข้อง

function AddBook() {
  return (
    <div className="addbook-container">
      <h2>Add New Book</h2>
      <form className="addbook-form">
        <input type="text" className="addbook-input" placeholder="Book Title" />
        <input type="text" className="addbook-input" placeholder="Book Author" />
        <button className="addbook-submit-btn" type="submit">Add Book</button>
      </form>
    </div>
  );
}

export default AddBook;
