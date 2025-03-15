import React from 'react';
import './EditBook.css';  // นำเข้า CSS ที่เกี่ยวข้อง

function EditBook() {
  return (
    <div className="editbook-container">
      <h2>Edit Book</h2>
      <form className="editbook-form">
        <input type="text" className="editbook-input" placeholder="Book Title" />
        <input type="text" className="editbook-input" placeholder="Book Author" />
        <button className="editbook-submit-btn" type="submit">Save Changes</button>
      </form>
    </div>
  );
}

export default EditBook;
