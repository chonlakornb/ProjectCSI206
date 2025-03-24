import React, { useState } from 'react';
import Navbar from './Navbar'; // นำเข้า Navbar
import './Favorites.css';

const Favorites = () => {
  const [favorites, setFavorites] = useState([
    {
      id: 1,
      title: 'KAGURABACHI',
      author: 'Lorem ipsum dolor sit amet.',
      cover_image: '/src/img/1.png',
    },
    {
      id: 8,
      title: 'KAIJU NO.8 8',
      author: 'Lorem ipsum dolor sit, amet ',
      cover_image: '/src/img/10.png',
    },
    {
      id: 3,
      title: 'SAKAMOTO DAYS ',
      author: 'Lorem ipsum dolor sit amet.',
      cover_image: '/src/img/5.png',
    },
  ]);

  const handleRemoveFavorite = (id) => {
    setFavorites(favorites.filter((favorite) => favorite.id !== id));
  };

  return (
    <div className="favorites-page">
      {/* เพิ่ม Navbar ที่นี่ */}
      <Navbar />  
      
      <div className="favorites-container" id="Favorites">
        <h1>Your Favorites</h1>
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
