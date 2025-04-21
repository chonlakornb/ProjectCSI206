import bcrypt from 'bcryptjs';
import { pool } from '../config/db.js';

export const getUsers = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admins only.' });
    }
    const [users] = await pool.query('SELECT user_id, email, role FROM users'); // Use email
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const [users] = await pool.query('SELECT user_id, email, role FROM users WHERE user_id = ?', [req.user.id]); // Use email
    if (users.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(users[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateUserProfile = async (req, res) => {
  const { email, password, phone } = req.body; // Include phone in the request body

  try {
    const [users] = await pool.query('SELECT * FROM users WHERE user_id = ?', [req.user.id]);
    if (users.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const hashedPassword = password ? await bcrypt.hash(password, 10) : users[0].password;

    await pool.query(
      'UPDATE users SET email = ?, password = ?, phone = ? WHERE user_id = ?',
      [email || users[0].email, hashedPassword, phone || users[0].phone, req.user.id] // Update phone
    );

    res.json({ message: 'User profile updated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteUserProfile = async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM users WHERE user_id = ?', [req.user.id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User account deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateUserById = async (req, res) => {
  const { id } = req.params; // 'id' is the parameter from the route
  const { name, phone, password } = req.body;

  try {
    // Use 'user_id' instead of 'id' in the query
    const [users] = await pool.query('SELECT * FROM users WHERE user_id = ?', [id]);
    if (users.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const hashedPassword = password ? await bcrypt.hash(password, 10) : users[0].password;

    await pool.query(
      'UPDATE users SET name = ?, phone = ?, password = ? WHERE user_id = ?',
      [name || users[0].name, phone || users[0].phone, hashedPassword, id]
    );

    res.json({ message: 'User account updated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
