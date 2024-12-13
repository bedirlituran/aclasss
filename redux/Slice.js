import { createSlice } from "@reduxjs/toolkit";

const Slice = createSlice({
  name: "counter",
  initialState: {
    count: 0,
  },
  reducers: {
    increase: (state) => {
      state.count++;
    },
    decrease: (state) => {
      state.count--;
    },
    sifirla: (state) => {
      state.count = 0;
    },
  },
});

// Burada sadece reducer kısmını `default export` yapıyoruz
export const { increase, decrease, sifirla } = Slice.actions;
export default Slice.reducer;
