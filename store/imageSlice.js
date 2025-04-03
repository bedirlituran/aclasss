import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  images: [],
};

const imageSlice = createSlice({
  name: 'images',
  initialState,
  reducers: {
    addImage: (state, action) => {
      if (action.payload) {
        state.images = [];
        state.images.push(action.payload);
      } else {
        console.error('Geçersiz resim URI\'si');
      }
    },
  },
});

export const { addImage } = imageSlice.actions;
export default imageSlice.reducer;

