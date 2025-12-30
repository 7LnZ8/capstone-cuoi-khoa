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
  const ACCESSTOKEN = localStorage.getItem("ACCESSTOKEN");

  config.headers = {
    ...config.headers,
    TokenCybersoft: TOKEN_CYBERSOFT,
  };

  if (ACCESSTOKEN) {
    config.headers.Authorization = `Bearer ${ACCESSTOKEN}`;
  } else {
    delete config.headers.Authorization;
  }

  return config;
});

export const apiQLND = axios.create({
  baseURL: "https://elearningnew.cybersoft.edu.vn/api/QuanLyNguoiDung/",
  timeout: 10000, // 10 seconds
  headers: {
    "Content-Type": "application/json",
  },
});

apiQLND.interceptors.request.use((config) => {
  const ACCESSTOKEN = localStorage.getItem("ACCESSTOKEN");

  config.headers = {
    ...config.headers,
    TokenCybersoft: TOKEN_CYBERSOFT,
  };

  if (ACCESSTOKEN) {
    config.headers.Authorization = `Bearer ${ACCESSTOKEN}`;
  } else {
    delete config.headers.Authorization;
  }

  return config;
});

// email
// :
// "giang@gmail.com"
// hoTen
// :
// "Trịnh Xuân Giang"
// maNhom
// :
// "GP01"
// matKhau
// :
// "11111111"
// soDT
// :
// "0832369372"
// taiKhoan
// :
// "trinhgiang"
