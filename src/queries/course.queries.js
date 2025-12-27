//Query + mutation cho khóa học
import { useQuery } from "@tanstack/react-query";
import { api } from "../services/api.js";

// Lấy danh sách khóa học
export const useCourses = () => {
  return useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      const res = await api.get("LayDanhSachKhoaHoc?MaNhom=GP01");
      console.log("API data:", res.data);
      return res.data;
    },
  });
};
