import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiQLND, api } from "../services/api.js";

// =======================================================
// PHẦN 1: CLIENT HOOKS (Code của bạn - Dùng cho User/Auth)
// =======================================================

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
    staleTime: 5 * 60 * 1000,
  });
};

// 4. Hook Đăng ký khóa học
export const useRegisterCourseMutation = () => {
  return useMutation({
    mutationFn: async (maKhoaHoc) => {
      const user = JSON.parse(localStorage.getItem("user"));
      // Gọi API đăng ký
      const res = await api.post("DangKyKhoaHoc", {
        maKhoaHoc: maKhoaHoc,
        taiKhoan: user?.taiKhoan,
      });
      return res.data;
    },
  });
};

// =======================================================
// PHẦN 2: ADMIN HOOKS (Code cũ của dự án - Đừng xóa)
// =======================================================

// Lấy danh sách người dùng (Admin)
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

// Tìm kiếm người dùng (Admin)
export const useGetUserInfo = (keyQuery) => {
  return useQuery({
    queryKey: ["usersSearch", keyQuery],
    queryFn: async () => {
      const res = await apiQLND.get(
        `TimKiemNguoiDung?tuKhoa=${encodeURIComponent(keyQuery)}`
      );
      console.log("Tìm kiếm người dùng", res.data);
      return res.data;
    },
    enabled: !!keyQuery,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};

// Cập nhật thông tin người dùng (Admin)
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

// Xóa người dùng (Admin)
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
