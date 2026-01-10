import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Button, Input, message } from "antd";
import { registerSchema } from "../../schemas/auth.schema.js";
import { useRegisterMutation } from "../../queries/user.queries.js";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const { mutate, isPending } = useRegisterMutation();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      taiKhoan: "",
      matKhau: "",
      hoTen: "",
      email: "",
      soDT: "",
      maNhom: "GP01",
    },
  });

  const onSubmit = (values) => {
    mutate(values, {
      onSuccess: () => {
        message.success("Đăng ký thành công! Vui lòng đăng nhập.");
        navigate("/login");
      },
      onError: (error) => {
        message.error(error.response?.data || "Đăng ký thất bại");
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: 400, margin: "0 auto", padding: 20 }}>
      <h2>Đăng ký</h2>
      {/* Bạn copy các Controller Input tương tự bên Login cho các trường: taiKhoan, matKhau, hoTen, email, soDT */}
      {/* Ví dụ 1 trường Họ tên */}
      <div style={{ marginBottom: 16 }}>
        <label>Họ tên</label>
        <Controller
          name="hoTen"
          control={control}
          render={({ field }) => <Input {...field} placeholder="Họ tên" />}
        />
        {errors.hoTen && <p style={{ color: "red" }}>{errors.hoTen.message}</p>}
      </div>
      
      {/* ... Các trường còn lại ... */}

      <Button type="primary" htmlType="submit" loading={isPending} block>
        Đăng ký
      </Button>
    </form>
  );
}