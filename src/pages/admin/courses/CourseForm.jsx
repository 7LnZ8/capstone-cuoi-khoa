import React from "react";
import { Button, Form, Input } from "antd";
const CourseForm = () => {
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

  return (
    <div className="form-course">
      {/* <Form form={form} layout="vertical" onFinish={handleFinish}> */}
      <Form layout="vertical">
        <Form.Item label="Mã khóa học" name="maKhoaHoc">
          <Input placeholder="VD: BC01" />
        </Form.Item>

        <Form.Item label="Tên khóa học" name="tenKhoaHoc">
          <Input placeholder="VD: Lập trình React cơ bản" />
        </Form.Item>

        <Form.Item label="Mô tả" name="moTa">
          <Input.TextArea rows={3} placeholder="Nhập mô tả" />
        </Form.Item>

        <Form.Item label="Hình ảnh" name="hinhAnh">
          <Input placeholder="VD: react-basic.jpg" />
        </Form.Item>

        <Form.Item label="Danh mục" name="maDanhMucKhoaHoc">
          <Input placeholder="VD: FrontEnd" />
        </Form.Item>
        <Button>Tạo Khóa Học</Button>
      </Form>
    </div>
  );
};

export default CourseForm;
