import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Constants from 'expo-constants';
const apiUrl = Constants.expoConfig.extra.apiKey;

export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        apiUrl + '/auth/login',
        { username, password }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);