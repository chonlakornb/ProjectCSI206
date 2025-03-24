import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Favorites.css';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/favorites', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Assuming token is stored in localStorage
          },
        });
        setFavorites(response.data);
      } catch (error) {
        setMessage(error.response?.data?.message || 'Failed to fetch favorites.');
      }
    };

    fetchFavorites();
  }, []);

  const handleRemoveFavorite = async (bookId) => {
    try {
      await axios.delete(`http://localhost:3000/api/favorites/${bookId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setFavorites(favorites.filter((favorite) => favorite.book._id !== bookId));
      setMessage('Book removed from favorites.');
    } catch (error) {
      setMessage(error.response?.data?.message || 'Failed to remove favorite.');
    }
  };

  return (
    <div className="favorites-container">
      <h1>Your Favorites</h1>
      {message && <p className="message">{message}</p>}
      <div className="favorites-grid">
        {favorites.map((favorite) => (
          <div className="favorite-card" key={favorite.book._id}>
            <img src={favorite.book.cover_image} alt={favorite.book.title} />
            <h2>{favorite.book.title}</h2>
            <p>{favorite.book.author}</p>
            <button onClick={() => handleRemoveFavorite(favorite.book._id)}>
              Remove from Favorites
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;
