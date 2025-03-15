import React from 'react';
import './ViewBooks.css';  // นำเข้า CSS ที่เกี่ยวข้อง

function ViewBooks() {
  return (
    <div className="viewbooks-container">
      <h2>View All Books</h2>
      <table className="viewbooks-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {/* นี่เป็นตัวอย่างแถวข้อมูล */}
          <tr>
            <td>Book Title</td>
            <td>Book Author</td>
            <td><button>Edit</button> <button>Delete</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default ViewBooks;
