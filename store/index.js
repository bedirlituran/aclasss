import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import favoritesReducer from "./favoritesSlice"; // Yeni beğeni slice\
import reviewReducer from './reviewReducer'; // Yeni yorum slice'ini ekledik
import imageReducer from './imageSlice';
import productReducer from './productSlice';
import authReducer from './authSlice';
// Redux store'u oluşturuyoruz
const store = configureStore({
  reducer: {
    cart: cartReducer,
    favorites: favoritesReducer,
    reviews: reviewReducer, // Beğeni reducer'ı ekledik
    images: imageReducer, // imageSlice reducer'ını store'a ekliyoruz
    product: productReducer,
    auth: authReducer,
  },
});

export default store;
