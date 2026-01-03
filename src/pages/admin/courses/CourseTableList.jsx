import React from "react";
import { Table, Button, Image, Space, Tooltip } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const CourseTableList = React.memo(function CourseTableList({ data }) {
  const navigate = useNavigate();

  const dataSource = (data || []).map((course, index) => ({
    key: index + 1,
    hinhAnh: course.hinhAnh,
    maKhoaHoc: course.maKhoaHoc,
    tenKhoaHoc: course.tenKhoaHoc,
    ngayTao: course.ngayTao,
    nguoiTao: course.nguoiTao?.hoTen || "N/A",
    danhMucKhoaHoc:
      course.danhMucKhoaHoc?.tenDanhMucKhoaHoc ||
      course.danhMucKhoaHoc ||
      "N/A",
  }));

  // Cột của bảng
  const columns = [
    {
      title: "STT",
      dataIndex: "key",
      width: 60,
      align: "center",
    },
    {
      title: "Hình ảnh",
      dataIndex: "hinhAnh",
      render: (src) => (
        <Image
          width={60}
          height={40}
          src={src}
          // nếu ảnh lỗi thì dùng ảnh này
          fallback="/image.png"
          style={{ objectFit: "cover", borderRadius: 4 }}
        />
      ),
      width: 100,
    },
    {
      title: "Mã KH",
      dataIndex: "maKhoaHoc",
      width: 80,
      align: "center",
    },
    {
      title: "Tên khóa học",
      dataIndex: "tenKhoaHoc",
    },

    {
      title: "Ngày tạo",
      dataIndex: "ngayTao",
      width: 120,
      align: "center",
    },
    {
      title: "Người tạo",
      dataIndex: "nguoiTao",
      width: 100,
    },
    {
      title: "Danh mục",
      dataIndex: "danhMucKhoaHoc",
      width: 180,
    },
    {
      title: "Hành động",
      width: 180,
      align: "center",
      render: (_, record) => (
        <Space>
          <Tooltip title="Sửa">
            <Button
              type="link"
              icon={<EditOutlined />}
              onClick={() =>
                navigate(`/admin/courses/${record.tenKhoaHoc}/edit`)
              }
            />
          </Tooltip>
          <Tooltip title="Xóa">
            <Button
              type="link"
              danger
              icon={<DeleteOutlined />}
              onClick={() => console.log("Xóa", record)}
            />
          </Tooltip>
          <Tooltip title="Upload ảnh">
            <Button
              type="link"
              icon={<UploadOutlined />}
              onClick={() => console.log("Upload ảnh", record)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];
  return (
    <Table
      dataSource={dataSource}
      columns={columns}
      pagination={{
        pageSize: 5,
        responsive: true,
        showSizeChanger: false,
        position: ["bottomRight"],
      }}
      bordered
    />
  );
});

export default CourseTableList;
