import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api, apiQLND } from "../services/api.js";

//------------- THEO BƯỜI DÙNG
//Danh sách chưa ghi danh khóa học
export const useGetCourseNotRegisterByUser = (keyQuery) => {
  return useQuery({
    queryKey: ["useGetCourseNotRegister", "usersList", keyQuery],
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

//Danh sách đã ghi danh khóa học
export const useGetCourseWasRegisterByUser = (keyQuery) => {
  return useQuery({
    queryKey: ["useGetCourseWasRegister", "usersList", keyQuery],
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

//Danh sách chờ duyệt ghi danh khóa học
export const useGetCoursePendingByUser = (keyQuery) => {
  return useQuery({
    queryKey: ["useGetCoursePending", "usersList", keyQuery],
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

//Ghi danh khóa học theo id
export const useAddCourseById = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload) => {
      const res = await api.post("GhiDanhKhoaHoc", payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["usersList"]);
    },
  });
};

export const useDeleteCourseById = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload) => {
      const res = await api.post("HuyGhiDanh", payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["usersList"]);
    },
  });
};
