import { useQuery } from "@tanstack/react-query";
import { api } from "../services/api.js";

//Lấy mã danh mục khóa học
export const useGetCategoriesCode = () => {
  return useQuery({
    queryKey: ["categoriesCode"],
    queryFn: async () => {
      const res = await api.get("LayDanhMucKhoaHoc");
      console.log("Lấy danh muc khóa học:", res.data);
      return res.data;
    },
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};
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
// Lấy danh sách khóa học (Có thể dùng cho cả trang Home và trang Danh sách)
export const useGetCourseList = () => {
  return useQuery({
    queryKey: ["courseList"],
    queryFn: async () => {
      // Gọi API LayDanhSachKhoaHoc với mã nhóm mặc định GP01
      const res = await api.get("LayDanhSachKhoaHoc?MaNhom=GP01");
      return res.data;
    },
    staleTime: 5 * 60 * 1000, // Cache 5 phút
    keepPreviousData: true,
  });
};