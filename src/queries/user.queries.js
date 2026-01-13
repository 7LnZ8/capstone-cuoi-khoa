import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiQLND, api } from "../services/api.js";

// =======================================================
// PHẦN 1: CLIENT HOOKS (Dành cho User)
// =======================================================

// 1. Hook Đăng nhập
export const useLoginMutation = () => {
  return useMutation({
    mutationFn: async (formData) => {
      const res = await apiQLND.post("DangNhap", formData);
      return res.data; // Trả về data user
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

// 3. Hook Lấy thông tin chi tiết (Profile + Khóa học đã ghi danh)
export const useUserProfile = () => {
  return useQuery({
    queryKey: ["userProfile"],
    queryFn: async () => {
      const res = await apiQLND.post("ThongTinTaiKhoan");
      return res.data;
    },
    // Chỉ gọi API khi có Token trong localStorage
    enabled: !!localStorage.getItem("ACCESSTOKEN"),
    staleTime: 5 * 60 * 1000, 
  });
};

// 4. Hook Đăng ký khóa học
export const useRegisterCourseMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (maKhoaHoc) => {
      // Lấy tài khoản từ localStorage (lưu lúc login)
      const user = JSON.parse(localStorage.getItem("USER_LOGIN") || localStorage.getItem("user"));
      
      if (!user || !user.taiKhoan) {
        throw new Error("Vui lòng đăng nhập để đăng ký khóa học");
      }

      const res = await api.post("DangKyKhoaHoc", {
        maKhoaHoc: maKhoaHoc,
        taiKhoan: user.taiKhoan,
      });
      return res.data;
    },
    onSuccess: () => {
      // Refresh lại profile để cập nhật danh sách khóa học vừa đăng ký
      queryClient.invalidateQueries(["userProfile"]); 
    }
  });
};

// =======================================================
// PHẦN 2: ADMIN HOOKS (Dành cho Quản trị viên)
// =======================================================

// Lấy danh sách người dùng
export const useGetUsersList = () => {
  return useQuery({
    queryKey: ["usersList"],
    queryFn: async () => {
      const res = await apiQLND.get("LayDanhSachNguoiDung");
      return res.data;
    },
    staleTime: 5 * 60 * 1000,
  });
};

// Tìm kiếm người dùng
export const useGetUserInfo = (keyQuery) => {
  return useQuery({
    queryKey: ["usersSearch", keyQuery],
    queryFn: async () => {
      const res = await apiQLND.get(
        `TimKiemNguoiDung?tuKhoa=${encodeURIComponent(keyQuery)}`
      );
      return res.data;
    },
    enabled: !!keyQuery,
  });
};

// Cập nhật người dùng
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

// Xóa người dùng
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