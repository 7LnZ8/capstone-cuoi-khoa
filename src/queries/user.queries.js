import { apiQLND } from "../services/api.js";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

//Lấy danh sách người dùng
export const useGetUsersList = () => {
  return useQuery({
    queryKey: ["usersList"],
    queryFn: async () => {
      const res = await apiQLND.get("LayDanhSachNguoiDung");
      console.log("Lấy danh sách người dùng", res.data);
      return res.data;
    },
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};

//Lấy thông tin người dùng
export const useGetUserInfo = (keyQuery) => {
  return useQuery({
    queryKey: ["usersSearch", keyQuery],
    queryFn: async () => {
      const res = await apiQLND.get(`TimKiemNguoiDung?tuKhoa=${keyQuery}`);
      console.log("Lấy danh sách người dùng", res.data);
      return res.data;
    },
    enabled: !!keyQuery, //tránh gọi khi nó undefined
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload) => {
      const res = await apiQLND.put("CapNhatThongTinNguoiDung", payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["usersList"]);
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (taiKhoan) =>
      await apiQLND.delete(
        `XoaNguoiDung?TaiKhoan=${encodeURIComponent(taiKhoan)}`
      ),

    onSuccess: () => {
      queryClient.invalidateQueries(["usersList"]);
    },
  });
};
// src/queries/user.queries.js
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiQLND, api } from "../services/api.js"; // Import đúng instance axios

// --- HOOKS CHO CLIENT ---

// 1. Hook Đăng nhập
export const useLoginMutation = () => {
  return useMutation({
    mutationFn: async (formData) => {
      const res = await apiQLND.post("DangNhap", formData);
      return res.data;
    },
  });
};

// 2. Hook Đăng ký
export const useRegisterMutation = () => {
  return useMutation({
    mutationFn: async (formData) => {
      const res = await apiQLND.post("DangKy", formData);
      return res.data;
    },
  });
};

// 3. Hook lấy thông tin chi tiết tài khoản (Profile + Khóa học đã đăng ký)
export const useUserProfile = () => {
  return useQuery({
    queryKey: ["userProfile"],
    queryFn: async () => {
      const res = await apiQLND.post("ThongTinTaiKhoan");
      return res.data;
    },
    // Chỉ gọi khi đã có token (người dùng đã đăng nhập)
    enabled: !!localStorage.getItem("ACCESSTOKEN"), 
  });
};

// 4. Hook Đăng ký khóa học
export const useRegisterCourseMutation = () => {
  return useMutation({
    mutationFn: async (maKhoaHoc) => {
      // API yêu cầu body là object { maKhoaHoc: "..." } hoặc tùy swagger
      // Theo swagger file api.txt: endpoint DangKyKhoaHoc nhận body {maKhoaHoc, taiKhoan}
      const user = JSON.parse(localStorage.getItem("user"));
      const res = await api.post("DangKyKhoaHoc", {
        maKhoaHoc: maKhoaHoc,
        taiKhoan: user?.taiKhoan,
      });
      return res.data;
    },
  });
};
