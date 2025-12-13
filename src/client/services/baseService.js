import axios from "axios";
import { DOMAIN, TOKEN_CYBERSOFT, ACCESSTOKEN } from "../utils/setting/config";

// Tạo instance của axios
export const https = axios.create({
  baseURL: DOMAIN,
  timeout: 30000, 
});
https.interceptors.request.use(
  (config) => {
    config.headers = {
      ...config.headers,
      TokenCybersoft: TOKEN_CYBERSOFT,
    };
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
