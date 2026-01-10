// src/queries/category.queries.js
import { useQuery } from "@tanstack/react-query";
import { api } from "../services/api.js";

// Lấy danh mục (Đã có sẵn trong file của bạn)
export const useGetCategoriesCode = () => {
  // ... code cũ giữ nguyên
  return useQuery({
    queryKey: ["categoriesCode"],
    queryFn: async () => {
      const res = await api.get("LayDanhMucKhoaHoc");
      return res.data;
    },
    staleTime: 5 * 60 * 1000,
  });
};

// --- THÊM MỚI ---

// 1. Lấy danh sách toàn bộ khóa học (Cho trang Home)
export const useGetPublicCourseList = () => {
  return useQuery({
    queryKey: ["publicCourses"],
    queryFn: async () => {
      const res = await api.get("LayDanhSachKhoaHoc?MaNhom=GP01");
      return res.data;
    },
  });
};

// 2. Lấy chi tiết khóa học (Cho trang Detail)
export const useGetCourseDetail = (id) => {
  return useQuery({
    queryKey: ["courseDetail", id],
    queryFn: async () => {
      const res = await api.get(`LayThongTinKhoaHoc?maKhoaHoc=${id}`);
      return res.data;
    },
    enabled: !!id, // Chỉ fetch khi có id
  });
};