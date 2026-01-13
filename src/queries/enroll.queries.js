import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../services/api"; // Import instance axios đã cấu hình (có token)
import { message } from "antd";

// Hàm gọi API
const registerCourseApi = (data) => {
  // data gồm: { maKhoaHoc, taiKhoan }
  return api.post("DangKyKhoaHoc", data);
};

export const useRegisterCourseMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: registerCourseApi,
    onSuccess: () => {
      message.success("Đăng ký khóa học thành công!");
      // Làm mới lại dữ liệu người dùng hoặc danh sách khóa học nếu cần
      // queryClient.invalidateQueries(["USER_PROFILE"]); 
    },
    onError: (error) => {
      // API thường trả về lỗi dạng chuỗi trong error.response.data
      const errorMsg = error.response?.data || "Đăng ký thất bại!";
      message.error(typeof errorMsg === 'string' ? errorMsg : "Đã xảy ra lỗi");
    },
  });
};