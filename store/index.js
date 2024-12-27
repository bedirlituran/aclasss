import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import cartReducer from './cartSlice';
import favoritesReducer from "./favoritesSlice"; // Yeni beğeni slice\
import reviewReducer from './reviewReducer'; // Yeni yorum slice'ini ekledik

// Redux store'u oluşturuyoruz
const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
    favorites: favoritesReducer,
    reviews: reviewReducer, // Beğeni reducer'ı ekledik
  },
});

export default store;
