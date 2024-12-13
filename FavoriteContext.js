import React, { createContext, useContext, useState } from 'react';

// Context oluşturuluyor
const FavoriteContext = createContext();

// Favori sağlayıcı bileşeni
export const FavoriteProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  // Favorilere ekleme fonksiyonu
  const addToFavorites = (item) => {
    setFavorites((prev) => [...prev, item]);
  };

  // Favorilerden çıkarma fonksiyonu
  const removeFromFavorites = (item) => {
    setFavorites((prev) => prev.filter((fav) => fav.id !== item.id));
  };

  // Bir öğenin favori olup olmadığını kontrol etme
  const isFavorite = (item) => {
    return favorites.some((fav) => fav.id === item.id);
  };

  return (
    <FavoriteContext.Provider
      value={{ favorites, addToFavorites, removeFromFavorites, isFavorite }}
    >
      {children}
    </FavoriteContext.Provider>
  );
};

// Favori context kullanımı için hook
export const useFavorites = () => useContext(FavoriteContext);
