import React, { useState } from 'react';

function AddBook() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [year, setYear] = useState('');
  const [genre, setGenre] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to add book (send data to backend or state management)
    console.log({ title, author, year, genre });
  };

  return (
    <div>
      <h2>เพิ่มข้อมูลหนังสือ</h2>
      <form onSubmit={handleSubmit}>
        <label>ชื่อหนังสือ:</label>
        <input 
          type="text" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          required 
        />
        <label>ผู้แต่ง:</label>
        <input 
          type="text" 
          value={author} 
          onChange={(e) => setAuthor(e.target.value)} 
          required 
        />
        <label>ปีที่พิมพ์:</label>
        <input 
          type="number" 
          value={year} 
          onChange={(e) => setYear(e.target.value)} 
          required 
        />
        <label>ประเภทหนังสือ:</label>
        <input 
          type="text" 
          value={genre} 
          onChange={(e) => setGenre(e.target.value)} 
        />
        <button type="submit">เพิ่มหนังสือ</button>
      </form>
    </div>
  );
}

export default AddBook;
