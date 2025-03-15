import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

// Import Components
import Home from './Component/Home';
import AddBook from './Component/AddBook';
import ViewBooks from './Component/ViewBooks';
import EditBook from './Component/EditBook';
import About from './Component/About';
import Login from './Component/Login';

function App() {
  return (
    <Router>
      <div>
        <header>
          <h1>ระบบจัดการหนังสือ</h1>
          <nav>
            <ul>
              <li><Link to="/">หน้าหลัก</Link></li>
              <li><Link to="/add-book">เพิ่มหนังสือ</Link></li>
              <li><Link to="/view-books">ดูหนังสือทั้งหมด</Link></li>
              <li><Link to="/about">เกี่ยวกับเรา</Link></li>
              <li><Link to="/login">เข้าสู่ระบบ</Link></li>
            </ul>
          </nav>
        </header>
        
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add-book" element={<AddBook />} />
            <Route path="/view-books" element={<ViewBooks />} />
            <Route path="/edit-book/:id" element={<EditBook />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
        
        <footer>
          <p>&copy; 2025 ระบบจัดการหนังสือ</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
