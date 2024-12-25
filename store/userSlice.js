import { createSlice } from '@reduxjs/toolkit';

// Başlangıç durumu
const initialState = {
  user: null,  // Kullanıcı bilgileri
};

// Kullanıcı slice'ı
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;  // Kullanıcıyı set etme
    },
    logout: (state) => {
      state.user = null;  // Kullanıcıyı çıkış yapma
    },
  },
});

// Actionları export ediyoruz
export const { setUser, logout } = userSlice.actions;

// Reducer'ı export ediyoruz
export default userSlice.reducer;
