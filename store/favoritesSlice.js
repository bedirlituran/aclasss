import { createSlice } from "@reduxjs/toolkit";

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: {
    items: [], // Beğenilen ürünler burada saklanacak
  },
  reducers: {
    addToFavorites: (state, action) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (!existingItem) {
        state.items.push(action.payload); // Ürün daha önce eklenmediyse ekle
      }
    },
    removeFromFavorites: (state, action) => {
      state.items = state.items.filter(
        (item) => item.id !== action.payload.id
      ); // Beğeniden çıkar
    },
  },
});

export const { addToFavorites, removeFromFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
