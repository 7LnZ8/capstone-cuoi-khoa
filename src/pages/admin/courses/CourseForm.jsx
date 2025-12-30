import { Button, Form, Input, Upload } from "antd";
import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
export default function CreateCourse() {
  // const [open, setOpen] = useState(false);
  // const [form] = Form.useForm();

  // const handleOpen = () => setOpen(true);
  // const handleCancel = () => {
  //   form.resetFields();
  //   setOpen(false);
  // };

  // const handleFinish = (values) => {
  //   console.log("DATA GỬI API:", values);
  //   setOpen(false);
  //   form.resetFields();
  // };
  const [imageFile, setImageFile] = useState({});

  const handleFinish = (values) => {
    const payload = {
      ...values,
      hinhAnh: imageFile?.name,
    };

    console.log("DATA GỬI API:", payload);
  };
  // console.log(imageFile.name);
  const location = useLocation();

  //tên ảnh được lưu
  console.log(imageFile.name);

  const { id } = useParams();
  if (id) {
    console.log(id);
  }

  return (
    <div className="form-course">
      {location.pathname === "/admin/courses/create" ? (
        <h3>THÊM KHÓA HỌC</h3>
      ) : (
        <h3>CẬP NHẬT KHÓA HỌC</h3>
      )}
      <Form layout="vertical" onFinish={handleFinish}>
        <Form.Item label="Mã khóa học" name="maKhoaHoc">
          <Input placeholder="VD: BC01" />
        </Form.Item>

        <Form.Item label="Tên khóa học" name="tenKhoaHoc">
          <Input placeholder="VD: Lập trình React cơ bản" />
        </Form.Item>

        <Form.Item label="Mô tả" name="moTa">
          <Input.TextArea rows={3} placeholder="Nhập mô tả" />
        </Form.Item>

        <Form.Item label="Hình ảnh">
          <Upload
            accept="image/*"
            maxCount={1}
            showUploadList
            beforeUpload={(file) => {
              setImageFile(file);
              return false;
            }}
          >
            <Button>Chọn hình ảnh khóa học</Button>
          </Upload>
        </Form.Item>

        <Form.Item label="Danh mục" name="maDanhMucKhoaHoc">
          <Input placeholder="VD: FrontEnd" />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          {location.pathname === "/admin/courses/create"
            ? "Tạo Khóa Học"
            : "Cập Nhật Khóa Học"}
        </Button>
      </Form>
    </div>
  );
}
