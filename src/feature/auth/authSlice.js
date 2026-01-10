// src/feature/auth/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginAction: (state, action) => {
      state.user = action.payload;
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    logoutAction: (state) => {
      state.user = null;
      localStorage.removeItem('user');
      localStorage.removeItem('ACCESSTOKEN');
    },
  },
});

export const { loginAction, logoutAction } = authSlice.actions;
export default authSlice.reducer; // Bắt buộc phải có dòng này