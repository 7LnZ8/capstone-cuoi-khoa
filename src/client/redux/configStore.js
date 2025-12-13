// src/redux/configStore.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice'; // Import reducer từ userSlice

export const store = configureStore({
  reducer: {
    // Đăng ký các slices vào store
    user: userReducer, // Reducer cho module Người dùng
    // (Sau này các module khác sẽ thêm vào đây)
    // course: courseReducer,
  },
  // Có thể thêm middleware, devTools: true (mặc định là true)
});