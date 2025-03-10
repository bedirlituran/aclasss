import { createSlice } from '@reduxjs/toolkit';

const productSlice = createSlice({
  name: 'product',
  initialState: {
    price: '',
    category: '',
    brand: '',
    description: '',
    stock:'',
  },
  reducers: {
    updateProductInfo: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { updateProductInfo } = productSlice.actions;
export default productSlice.reducer;