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
