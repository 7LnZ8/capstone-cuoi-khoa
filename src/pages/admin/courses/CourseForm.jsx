import { Button, DatePicker, Input, message, Select, Upload } from "antd";
import { useLocation } from "react-router-dom";
import {
  groupOptions,
  themKhoaHocSchema,
} from "../../../schemas/course.schema.js";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useAddCourse } from "../../../queries/course.queries.js";
import { useGetCategoriesCode } from "../../../queries/category.queries.js";
import { api } from "../../../services/api.js";
import { Spinner } from "react-bootstrap";

const defaultValues = {
  maKhoaHoc: "",
  biDanh: "",
  tenKhoaHoc: "",
  moTa: "",
  luotXem: 0,
  danhGia: 0,
  ngayTao: dayjs().format("DD/MM/YYYY"),
  maDanhMucKhoaHoc: "FrontEnd",
  taiKhoanNguoiTao: "trinhgiang",
  hinhAnh: "",
  maNhom: "GP01",
};

export default function CreateCourse() {
  const location = useLocation();
  const [fileList, setFileList] = useState([]);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(themKhoaHocSchema),
    defaultValues,
  });

  const addCourses = useAddCourse();
  const { data, isPending, isError, error } = useGetCategoriesCode();

  const onSubmit = async (values) => {
    const payload = {
      ...values,
      biDanh: values.maKhoaHoc,
      hinhAnh: fileList[0]?.name,
    };
    console.log(payload);
    try {
      const data = await addCourses.mutateAsync(payload);
      console.log("Form Data:", data);
      message.success("Submit thành công!");
    } catch (err) {
      console.log("Lỗi tạo:", err);
    }
  };

  // if (isPending)
  //   return (
  //     <div className="loading-text">
  //       <Spinner></Spinner> Nội dung đang tải...
  //     </div>
  //   );
  // if (isError) return <p>Lỗi: {String(error)}</p>;

  return (
    <div className="form-course">
      {location.pathname === "/admin/courses/create" ? (
        <h3>THÊM KHÓA HỌC</h3>
      ) : (
        <h3>CẬP NHẬT KHÓA HỌC</h3>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Mã khóa học</label>
          <Controller
            name="maKhoaHoc"
            control={control}
            render={({ field }) => <Input {...field} placeholder="VD: BC01" />}
          />

          {errors.maKhoaHoc && (
            <p className="text-danger">{errors.maKhoaHoc.message}</p>
          )}
        </div>
        <div>
          <label>Tên khóa học</label>
          <Controller
            name="tenKhoaHoc"
            control={control}
            render={({ field }) => (
              <Input {...field} placeholder="VD: Lập trình React cơ bản" />
            )}
          />
          {errors.tenKhoaHoc && (
            <p className="text-danger">{errors.tenKhoaHoc.message}</p>
          )}
        </div>

        <div>
          <label>Mô tả</label>
          <Controller
            name="moTa"
            control={control}
            render={({ field }) => (
              <Input.TextArea {...field} rows={3} placeholder="Nhập mô tả" />
            )}
          />
          {errors.moTa && <p className="text-danger">{errors.moTa.message}</p>}
        </div>

        <div>
          <label>Tải ảnh khóa học</label>
          <Controller
            name="hinhAnh"
            control={control}
            render={({ field }) => (
              <Upload
                accept="image/*"
                maxCount={1}
                showUploadList
                fileList={fileList} // quản lý hiển thị file
                beforeUpload={(file) => {
                  setFileList([file]); // thêm file vào list
                  field.onChange(file.name); // đồng bộ với RHF
                  return false; // ngăn Upload tự upload
                }}
                onRemove={() => {
                  setFileList([]); // xóa file khỏi list
                  field.onChange(null); // xóa file khỏi RHF
                }}
              >
                <button type="button">Chọn từ máy</button>
              </Upload>
            )}
          />
          {errors.hinhAnh && (
            <p className="text-danger">{errors.hinhAnh.message}</p>
          )}
        </div>

        <div>
          <label>Mã nhóm</label>
          <Controller
            name="maNhom"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                style={{ width: "100%" }}
                placeholder="Chọn nhóm"
                onChange={(value) => field.onChange(value)}
              >
                {groupOptions.map((gp) => (
                  <Select.Option key={gp} value={gp}>
                    {gp}
                  </Select.Option>
                ))}
              </Select>
            )}
          />
          {errors.maNhom && (
            <p className="text-danger">{errors.maNhom.message}</p>
          )}
        </div>

        <div>
          <label>Ngày tạo</label>
          <Controller
            name="ngayTao"
            control={control}
            render={({ field }) => (
              <DatePicker
                {...field}
                value={field.value ? dayjs(field.value, "DD/MM/YYYY") : null}
                format="DD/MM/YYYY"
                style={{ width: "100%" }}
                onChange={(date) =>
                  field.onChange(date ? date.format("DD/MM/YYYY") : "")
                }
              />
            )}
          />
          {errors.ngayTao && (
            <p className="text-danger">{errors.ngayTao.message}</p>
          )}
        </div>
        <div>
          <label>Mã danh mục khóa học</label>
          <Controller
            name="maDanhMucKhoaHoc"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                style={{ width: "100%" }}
                placeholder="Chọn nhóm"
                onChange={(value) => field.onChange(value)}
              >
                {data?.map((item) => (
                  <Select.Option key={item.maDanhMuc} value={item.maDanhMuc}>
                    {item.maDanhMuc}
                  </Select.Option>
                ))}
              </Select>
            )}
          />
          {errors.maDanhMucKhoaHoc && (
            <p className="text-danger">{errors.maDanhMucKhoaHoc.message}</p>
          )}
        </div>

        <button type="submit">
          {location.pathname === "/admin/courses/create"
            ? "Tạo Khóa Học"
            : "Cập Nhật Khóa Học"}
        </button>
      </form>
    </div>
  );
}
