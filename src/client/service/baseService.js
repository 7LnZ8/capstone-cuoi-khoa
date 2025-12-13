import axios from 'axios';
import { DOMAIN, TOKEN_CYBERSOFT, ACCESSTOKEN } from '../utils/settings/config';

// Tạo instance của axios
export const https = axios.create({
  baseURL: DOMAIN,
  timeout: 30000, // Timeout sau 30s
});

// Cấu hình Interceptor (Bộ đón chặn request)
// Mục đích: Tự động gắn TokenCybersoft và Authorization vào header mỗi khi gọi API
https.interceptors.request.use(
  (config) => {
    // 1. Cấu hình headers mặc định theo yêu cầu API 
    config.headers = {
      ...config.headers,
      TokenCybersoft: TOKEN_CYBERSOFT,
    };

    // 2. Lấy token đăng nhập từ LocalStorage (nếu có)
    const token = localStorage.getItem(ACCESSTOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);