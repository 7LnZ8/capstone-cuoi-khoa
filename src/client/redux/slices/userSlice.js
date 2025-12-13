import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { userService } from '../../services/userService'; 
import { ACCESSTOKEN, USER_LOGIN } from '../../utils/setting/config';

// Helper load localStorage
const getUserLoginFromStorage = () => {
    const userJson = localStorage.getItem(USER_LOGIN);
    if (userJson) return JSON.parse(userJson);
    return null;
};

const initialState = {
  currentUser: getUserLoginFromStorage(),
  isLoading: false,
  error: null,
};

// Async Thunk Login
export const loginUserAsync = createAsyncThunk(
  'user/loginUserAsync',
  async (loginData, { rejectWithValue }) => {
    try {
      const result = await userService.loginApi(loginData);
      localStorage.setItem(ACCESSTOKEN, result.data.accessToken);
      localStorage.setItem(USER_LOGIN, JSON.stringify(result.data));
      return result.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Đã có lỗi xảy ra');
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logoutAction: (state) => {
      localStorage.removeItem(USER_LOGIN);
      localStorage.removeItem(ACCESSTOKEN);
      state.currentUser = null;
      state.error = null;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUserAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentUser = action.payload;
        state.error = null;
      })
      .addCase(loginUserAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.currentUser = null;
        state.error = action.payload; 
      });
  },
});

export const { logoutAction } = userSlice.actions;
export default userSlice.reducer;