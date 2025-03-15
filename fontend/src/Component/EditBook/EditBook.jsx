import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function EditBook() {
  const { id } = useParams();
  const [book, setBook] = useState({ title: '', author: '', year: '', genre: '' });

  useEffect(() => {
    // Fetch book data based on ID (this could be from an API or database)
    setBook({ title: `หนังสือ ${id}`, author: `ผู้แต่ง ${id}`, year: 2025, genre: 'ประเภท A' });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(book);
  };

  return (
    <div>
      <h2>แก้ไขข้อมูลหนังสือ</h2>
      <form onSubmit={handleSubmit}>
        <label>ชื่อหนังสือ:</label>
        <input 
          type="text" 
          value={book.title} 
          onChange={(e) => setBook({ ...book, title: e.target.value })} 
          required 
        />
        <label>ผู้แต่ง:</label>
        <input 
          type="text" 
          value={book.author} 
          onChange={(e) => setBook({ ...book, author: e.target.value })} 
          required 
        />
        <label>ปีที่พิมพ์:</label>
        <input 
          type="number" 
          value={book.year} 
          onChange={(e) => setBook({ ...book, year: e.target.value })} 
          required 
        />
        <label>ประเภทหนังสือ:</label>
        <input 
          type="text" 
          value={book.genre} 
          onChange={(e) => setBook({ ...book, genre: e.target.value })} 
        />
        <button type="submit">อัปเดตหนังสือ</button>
      </form>
    </div>
  );
}

export default EditBook;
