import bcrypt from 'bcryptjs';
import { pool } from '../config/db.js';

export const getUsers = async (req, res) => {
  try {
    const [users] = await pool.query('SELECT id, username, role FROM users');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const [users] = await pool.query(
      'SELECT id, username, role, phone FROM users WHERE id = ?', // Include the phone field
      [req.user.id]
    );
    if (users.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(users[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateUserProfile = async (req, res) => {
  const { username, password, role } = req.body;

  try {
    const [users] = await pool.query('SELECT * FROM users WHERE id = ?', [req.user.id]);
    if (users.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const hashedPassword = password ? await bcrypt.hash(password, 10) : users[0].password;

    await pool.query(
      'UPDATE users SET username = ?, password = ?, role = ? WHERE id = ?',
      [username || users[0].username, hashedPassword, role || users[0].role, req.user.id]
    );

    res.json({ message: 'User profile updated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteUserProfile = async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM users WHERE id = ?', [req.user.id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User account deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
