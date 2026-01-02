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
