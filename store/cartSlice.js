import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalQuantity: 0,  // Sepetteki toplam ürün sayısı
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const itemIndex = state.items.findIndex(
        (item) =>
          item.id === action.payload.id &&
          item.price === action.payload.price &&
          item.name === action.payload.name
      );
      if (itemIndex >= 0) {
        // Eğer ürün zaten sepette varsa, miktarını arttır
        state.items[itemIndex].quantity += 1;
      } else {
        // Yeni ürün ekle
        state.items.push({ ...action.payload, quantity: 1 });
      }

      // Sepetteki toplam ürün sayısını güncelle
      state.totalQuantity = state.items.reduce((total, item) => total + item.quantity, 0);
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);

      // Sepetteki toplam ürün sayısını güncelle
      state.totalQuantity = state.items.reduce((total, item) => total + item.quantity, 0);
    },
    incrementQuantity: (state, action) => {
      const itemIndex = state.items.findIndex((item) => item.id === action.payload.id);
      if (itemIndex >= 0) {
        state.items[itemIndex].quantity += 1;
      }

      // Sepetteki toplam ürün sayısını güncelle
      state.totalQuantity = state.items.reduce((total, item) => total + item.quantity, 0);
    },
    decrementQuantity: (state, action) => {
      const itemIndex = state.items.findIndex((item) => item.id === action.payload.id);
      if (itemIndex >= 0 && state.items[itemIndex].quantity > 1) {
        state.items[itemIndex].quantity -= 1;
      }

      // Sepetteki toplam ürün sayısını güncelle
      state.totalQuantity = state.items.reduce((total, item) => total + item.quantity, 0);
    },
  },
});

export const { addToCart, removeFromCart, incrementQuantity, decrementQuantity } = cartSlice.actions;

export default cartSlice.reducer;
