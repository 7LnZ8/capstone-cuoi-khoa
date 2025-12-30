import { zodResolver } from "@hookform/resolvers/zod";

import { Controller, useForm } from "react-hook-form";

import { Button, Input, Select } from "antd";
import { useAddUserDemo } from "../../../queries/course.queries.js";
import { createUserSchema } from "../../../schemas/auth.schema.js";

export default function CreateAccount() {
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      taiKhoan: "",
      matKhau: "",
      hoTen: "",
      soDT: "",
      maLoaiNguoiDung: "GV",
      email: "",
      maNhom: "GP01",
    },
  });

  //   email
  // :
  // "bach@gmail.com"
  // hoTen
  // :
  // "trinh duy bach"
  // maLoaiNguoiDung
  // :
  // "GV"
  // maNhom
  // :
  // "GP01"
  // matKhau
  // :
  // "11111111"
  // soDT
  // :
  // "0987656384"
  // taiKhoan
  // :
  // "trinhduybach"

  const addUserDemo = useAddUserDemo();
  const onSubmit = async (values) => {
    const payload = {
      ...values,
    };
    console.log(payload);

    try {
      const data = await addUserDemo.mutateAsync(payload);
      console.log("Đăng ký thành công:", data);
    } catch (err) {
      console.log("Lỗi đăng ký:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: 600 }}>
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

      <label>Họ tên</label>
      <Controller
        name="hoTen"
        control={control}
        render={({ field }) => (
          <Input {...field} placeholder="Nhập họ và tên" />
        )}
      />
      {errors.hoTen && <p className="text-danger">{errors.hoTen.message}</p>}

      <label>Số điện thoại</label>
      <Controller
        name="soDT"
        control={control}
        render={({ field }) => (
          <Input {...field} placeholder="Nhập số điện thoại" />
        )}
      />
      {errors.soDT && <p className="text-danger">{errors.soDT.message}</p>}

      <label>Loại người dùng</label>
      <Controller
        name="maLoaiNguoiDung"
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            placeholder="Chọn loại người dùng"
            style={{ width: "100%" }}
          >
            <Select.Option value="HV">Học viên</Select.Option>
            <Select.Option value="GV">GV</Select.Option>
          </Select>
        )}
      />
      {errors.maLoaiNguoiDung && (
        <p className="text-danger">{errors.maLoaiNguoiDung.message}</p>
      )}

      <label>Email</label>
      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <Input {...field} placeholder="Nhập số điện thoại" />
        )}
      />
      {errors.email && <p className="text-danger">{errors.email.message}</p>}

      <Button type="primary" htmlType="submit" loading={isSubmitting}>
        Tạo tài khoản
      </Button>
    </form>
  );
}
