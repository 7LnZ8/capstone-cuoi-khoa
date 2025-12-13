import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { userService } from '../../services/userService';
import { ACCESSTOKEN, USER_LOGIN } from '../../utils/settings/config';

// Hàm helper để load thông tin user từ localStorage
const getUserLoginFromStorage = () => {
    const userJson = localStorage.getItem(USER_LOGIN);
    if (userJson) {
        return JSON.parse(userJson);
    }
    return null; // Trả về null nếu không có
};

const initialState = {
  currentUser: getUserLoginFromStorage(), // Lấy thông tin user ngay khi khởi tạo
  isLoading: false,
  error: null,
};
export const loginUserAsync = createAsyncThunk(
  'user/loginUserAsync',
  async (loginData, { rejectWithValue }) => {
    try {
      const result = await userService.loginApi(loginData);
      
      // Thành công, lưu vào LocalStorage
      localStorage.setItem(ACCESSTOKEN, result.data.accessToken);
      localStorage.setItem(USER_LOGIN, JSON.stringify(result.data));

      // Trả về data (userInfo) để cập nhật Redux state
      return result.data;

    } catch (error) {
      // Dùng rejectWithValue để đẩy error ra ngoài (để hiển thị toast lỗi)
      return rejectWithValue(error.response.data || 'Đã có lỗi xảy ra');
    }
  }
);
// src/redux/slices/userSlice.js (Tiếp theo)

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Reducer đồng bộ: Xử lý Đăng xuất
    logoutAction: (state) => {
      // Xóa thông tin trên LocalStorage
      localStorage.removeItem(USER_LOGIN);
      localStorage.removeItem(ACCESSTOKEN);
      
      // Reset state
      state.currentUser = null;
      state.error = null;
      state.isLoading = false;
    },
  },
  // ExtraReducers xử lý state của Async Thunk (pending, fulfilled, rejected)
  extraReducers: (builder) => {
    builder
      // ----------------- LOGIN PENDING (Đang chờ) -----------------
      .addCase(loginUserAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      // ----------------- LOGIN FULFILLED (Thành công) -----------------
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentUser = action.payload; // Payload là data user trả về từ API
        state.error = null;
      })
      // ----------------- LOGIN REJECTED (Thất bại/Lỗi) -----------------
      .addCase(loginUserAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.currentUser = null;
        // Action.payload là lỗi được trả về từ rejectWithValue
        state.error = action.payload; 
      });
  },
});

// Export actions thường (đồng bộ)
export const { logoutAction } = userSlice.actions;

// Export reducer
export default userSlice.reducer;