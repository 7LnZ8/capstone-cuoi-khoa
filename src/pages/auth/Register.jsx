import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Button, Input } from "antd";
import { registerSchema } from "../../schemas/auth.schema.js";
import { useRegister } from "../../queries/course.queries.js";

export default function Register() {
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      taiKhoan: "",
      matKhau: "",
      hoTen: "Trịnh Xuân Giang",
      soDT: "0832369372",
      maNhom: "GP01",
      email: "giang@gmail.com",
    },
  });

  const registerDemo = useRegister();

  const onSubmit = async (values) => {
    try {
      const data = await registerDemo.mutateAsync(values);
      console.log("Đăng ký thành công:", data);
    } catch (err) {
      console.log("Lỗi đăng ký:", err);
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
        Đăng Ký
      </Button>
    </form>
  );
}
