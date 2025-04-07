import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    user: null,
    isLoading: false,
    error: null,
    isLoggedIn: false,
    isFirstLaunch: true,
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      state.isLoggedIn = true;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    clearAuth: (state) => {
      state.token = null;
      state.user = null;
      state.isLoggedIn = false;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isLoggedIn = false;
    },
    completeOnboarding: (state) => {
      state.isFirstLaunch = false;
    },
  },
});

// Selector'lar
export const selectToken = (state) => state.auth.token;
export const selectUser = (state) => state.auth.user;
export const selectAuthLoading = (state) => state.auth.isLoading;
export const selectAuthError = (state) => state.auth.error;
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectIsFirstLaunch = (state) => state.auth.isFirstLaunch;

// Action'lar
export const { setToken, setUser, clearAuth, setLoading, setError, logout, completeOnboarding } = authSlice.actions;
export default authSlice.reducer;
