//Query + mutation cho khóa học
import { useMutation, useQuery } from "@tanstack/react-query";
import { api, apiQLND } from "../services/api.js";

// Lấy danh sách khóa học
export const useCourses = () => {
  return useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      const res = await api.get("LayDanhSachKhoaHoc?MaNhom=GP01");
      console.log("Lấy danh sách khóa học:", res.data);
      return res.data;
    },
  });
};
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoidHJpbmhnaWFuZyIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IkhWIiwibmJmIjoxNzY2ODUyODg2LCJleHAiOjE3NjY4NTY0ODZ9.Eq3wXVObKasm7cBwxVlFpasrThg-R53Ik2AlgEmjBK0

export const useAddUserDemo = () => {
  return useMutation({
    mutationFn: async (payload) => {
      const res = await apiQLND.post("ThemNguoiDung", payload);
      console.log(res.data);
      return res.data;
    },
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: async (payload) => {
      const res = await api.post("DangKy", payload);
      return res.data;
    },
  });
};

export const useLogin = () => {
  return useMutation({
    mutationFn: async (payload) => {
      const res = await apiQLND.post("DangNhap", payload);
      return res.data;
    },
  });
};

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoidHJpbmhnaWFuZyIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IkhWIiwibmJmIjoxNzY2ODUyODg2LCJleHAiOjE3NjY4NTY0ODZ9.Eq3wXVObKasm7cBwxVlFpasrThg-R53Ik2AlgEmjBK0
// export const useAddUserAdminSide = () {

// }
