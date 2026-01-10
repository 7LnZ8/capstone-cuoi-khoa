import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Button, Input, message } from "antd"; // Dùng message của antd để thông báo
import { loginSchema } from "../../schemas/auth.schema.js";
import { useLoginMutation } from "../../queries/user.queries.js"; // Import hook vừa tạo
import { useDispatch } from "react-redux";
import { loginAction } from "../../feature/auth/authSlice.js";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { mutate, isPending } = useLoginMutation(); // Đổi tên cho đúng convention

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { taiKhoan: "", matKhau: "" },
  });

  const onSubmit = (values) => {
    mutate(values, {
      onSuccess: (data) => {
        message.success("Đăng nhập thành công!");
        
        // 1. Lưu vào Redux & LocalStorage (qua action)
        dispatch(loginAction(data));

        // 2. Điều hướng dựa trên loại người dùng
        if (data.maLoaiNguoiDung === "GV") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      },
      onError: (error) => {
        // Xử lý lỗi từ API trả về (thường nằm trong error.response.data)
        message.error(error.response?.data || "Đăng nhập thất bại");
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: 400, margin: "0 auto", padding: 20 }}>
      <h2>Đăng nhập</h2>
      
      {/* Tài khoản */}
      <div style={{ marginBottom: 16 }}>
        <label>Tài khoản</label>
        <Controller
          name="taiKhoan"
          control={control}
          render={({ field }) => <Input {...field} placeholder="Nhập tài khoản" />}
        />
        {errors.taiKhoan && <p style={{ color: "red" }}>{errors.taiKhoan.message}</p>}
      </div>

      {/* Mật khẩu */}
      <div style={{ marginBottom: 16 }}>
        <label>Mật khẩu</label>
        <Controller
          name="matKhau"
          control={control}
          render={({ field }) => <Input.Password {...field} placeholder="Nhập mật khẩu" />}
        />
        {errors.matKhau && <p style={{ color: "red" }}>{errors.matKhau.message}</p>}
      </div>

      <Button type="primary" htmlType="submit" loading={isPending} block>
        Đăng nhập
      </Button>
    </form>
  );
}