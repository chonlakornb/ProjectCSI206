import React, { useState, useEffect } from 'react';
import Navbar from './Navbar'; // นำเข้า Navbar
import './Favorites.css';
import axios from 'axios';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3000/api/favorites', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFavorites(response.data);
      } catch (error) {
        console.error('Failed to fetch favorites:', error);
      }
    };

    fetchFavorites();
  }, []);

  const handleRemoveFavorite = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:3000/api/favorites/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFavorites(favorites.filter((favorite) => favorite.id !== id));
    } catch (error) {
      console.error('Failed to remove favorite:', error);
    }
  };

  return (
    <div className="favorites-page">
      {/* เพิ่ม Navbar ที่นี่ */}
      <Navbar />  
      
      <div className="favorites-container" id="Favorites">
        <h1>YOUR FAVORITES</h1>
        <div className="favorites-row">
          {favorites.map((favorite) => (
            <div className="favorite-card" key={favorite.id}>
              <img src={favorite.cover_image} alt={favorite.title} />
              <h2>{favorite.title}</h2>
              <p>{favorite.author}</p>
              <button onClick={() => handleRemoveFavorite(favorite.id)}>
                Remove from Favorites
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Favorites;
