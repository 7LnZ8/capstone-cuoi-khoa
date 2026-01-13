import { useQuery } from "@tanstack/react-query";
import { apiQLND } from "../services/api.js";

export const useGetCourseNotRegisterByUser = (keyQuery) => {
  return useQuery({
    queryKey: ["useGetCourseNotRegister", keyQuery],
    queryFn: async () => {
      const res = await apiQLND.post(
        `LayDanhSachKhoaHocChuaGhiDanh?TaiKhoan=${encodeURIComponent(keyQuery)}`
      );
      console.log("Danh sách chưa đăng ký", res.data);
      return res.data;
    },
    enabled: !!keyQuery,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};

export const useGetCourseWasRegisterByUser = (keyQuery) => {
  return useQuery({
    queryKey: ["useGetCourseWasRegister", keyQuery],
    queryFn: async () => {
      const res = await apiQLND.post("LayDanhSachKhoaHocDaXetDuyet", {
        taiKhoan: keyQuery,
      });
      console.log("Danh sách đã đăng ký", res.data);
      return res.data;
    },
    enabled: !!keyQuery,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};

export const useGetCoursePendingByUser = (keyQuery) => {
  return useQuery({
    queryKey: ["useGetCoursePending", keyQuery],
    queryFn: async () => {
      const res = await apiQLND.post("LayDanhSachKhoaHocChoXetDuyet", {
        taiKhoan: keyQuery,
      });
      console.log("Danh sách chờ duyệt", res.data);
      return res.data;
    },
    enabled: !!keyQuery,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};
