//State đăng nhập, user, role
// src/feature/auth/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null, // Lấy từ local storage nếu có
  isAuthenticated: !!localStorage.getItem("ACCESSTOKEN"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginAction: (state, action) => {
      // action.payload chứa thông tin user trả về từ API
      state.user = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem("user", JSON.stringify(action.payload));
      localStorage.setItem("ACCESSTOKEN", action.payload.accessToken);
    },
    logoutAction: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem("user");
      localStorage.removeItem("ACCESSTOKEN");
    },
  },
});

export const { loginAction, logoutAction } = authSlice.actions;
export default authSlice.reducer;