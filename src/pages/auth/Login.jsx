import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Button, Input } from "antd";
import { loginSchema } from "../../schemas/auth.schema.js";
import { useLogin } from "../../queries/course.queries.js";

export default function Login() {
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      taiKhoan: "",
      matKhau: "",
    },
  });

  const loginDemo = useLogin();

  const onSubmit = async (values) => {
    try {
      const data = await loginDemo.mutateAsync(values);
      console.log("Đăng nhập thành công:", data);
      localStorage.setItem("ACCESSTOKEN", data.accessToken);
    } catch (err) {
      console.log("Lỗi đăng nhập:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: 400 }}>
      <h2>Đăng nhập</h2>

      {/* Tài khoản */}
      <label>Tài khoản</label>
      <Controller
        name="taiKhoan"
        control={control}
        render={({ field }) => (
          <Input {...field} placeholder="Nhập tài khoản" />
        )}
      />
      {errors.taiKhoan && (
        <p className="text-danger">{errors.taiKhoan.message}</p>
      )}

      {/* Mật khẩu */}
      <label>Mật khẩu</label>
      <Controller
        name="matKhau"
        control={control}
        render={({ field }) => (
          <Input.Password {...field} placeholder="Nhập mật khẩu" />
        )}
      />
      {errors.matKhau && (
        <p className="text-danger">{errors.matKhau.message}</p>
      )}

      <Button
        type="primary"
        htmlType="submit"
        loading={isSubmitting}
        style={{ marginTop: 16 }}
        block
      >
        Đăng nhập
      </Button>
    </form>
  );
}
