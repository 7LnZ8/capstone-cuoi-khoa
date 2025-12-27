// Cấu hình kết nối API
// import axios from "axios";

// axios.defaults.baseURL =
//   "https://elearningnew.cybersoft.edu.vn/api/QuanLyKhoaHoc/";

import axios from "axios";

const TOKEN_CYBERSOFT =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJOb2RlanMgNTMiLCJIZXRIYW5TdHJpbmciOiIxOC8wNi8yMDI2IiwiSGV0SGFuVGltZSI6IjE3ODE3NDA4MDAwMDAiLCJuYmYiOjE3NjI4ODA0MDAsImV4cCI6MTc4MTg4ODQwMH0.DYatRVH7r1q5E_487BJ23mwTOYDycKumjaNeO7NmC04";

export const api = axios.create({
  baseURL: "https://elearningnew.cybersoft.edu.vn/api/QuanLyKhoaHoc/",
  timeout: 10000, // 10 seconds
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const ACESSTOKEN = localStorage.getItem("ACESSTOKEN");

  config.headers = {
    ...config.headers,
    TokenCybersoft: TOKEN_CYBERSOFT,
  };

  if (ACESSTOKEN) {
    config.headers.Authorization = `Bearer ${ACESSTOKEN}`;
  } else {
    delete config.headers.Authorization;
  }

  return config;
});
