import React from 'react';
import { Link } from 'react-router-dom';

function ViewBooks() {
  const books = [
    { id: 1, title: 'หนังสือ 1', author: 'ผู้แต่ง 1', year: 2025, genre: 'ประเภท A' },
    { id: 2, title: 'หนังสือ 2', author: 'ผู้แต่ง 2', year: 2024, genre: 'ประเภท B' }
  ];

  return (
    <div>
      <h2>ดูหนังสือทั้งหมด</h2>
      <table>
        <thead>
          <tr>
            <th>ชื่อหนังสือ</th>
            <th>ผู้แต่ง</th>
            <th>ปีที่พิมพ์</th>
            <th>ประเภทหนังสือ</th>
            <th>จัดการ</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.year}</td>
              <td>{book.genre}</td>
              <td>
                <Link to={`/edit-book/${book.id}`}>แก้ไข</Link> | 
                <button>ลบ</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ViewBooks;
