import React from "react";
import { Table, Button, Space, Tooltip, Popconfirm, message } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useDeleteUser } from "../../../queries/user.queries.js";

const UsersTable = React.memo(function UsersTable({ data }) {
  const navigate = useNavigate();

  const dataSource = (data || []).map((user, index) => ({
    key: index + 1,
    taiKhoan: user.taiKhoan,
    hoTen: user.hoTen,
    email: user.email,
    soDT: user.soDt,
    maLoaiNguoiDung: user.maLoaiNguoiDung,
  }));

  const { mutate: deleteUser, isLoading } = useDeleteUser();

  const handleDelete = (taiKhoan) => {
    console.log(taiKhoan);
    const taiKhoanTrimmed = taiKhoan.trim();
    deleteUser(taiKhoanTrimmed, {
      onSuccess: () => message.success("Xóa người dùng thành công"),
      onError: () =>
        message.error(
          "Xóa thất bại, có thể do người dùng đã tạo khóa học hoặc đã được ghi danh"
        ),
    });
  };

  //Người dùng đã tạo khóa học và ghi danh không thể xóa, có thể test bằng tạo người dùng mới

  // Cột của bảng
  const columns = [
    {
      title: "STT",
      dataIndex: "key",
      width: 60,
      align: "center",
    },

    {
      title: "Tên tài khoản",
      dataIndex: "taiKhoan",
      width: 80,
      align: "center",
    },

    {
      title: "Họ tên",
      dataIndex: "hoTen",
      width: 120,
      align: "center",
    },
    {
      title: "Email",
      dataIndex: "email",
      width: 120,
      align: "center",
    },
    {
      title: "Điện thoại",
      dataIndex: "soDT",
      width: 100,
      align: "center",
    },
    {
      title: "Loại Người dùng",
      dataIndex: "maLoaiNguoiDung",
      width: 180,
      align: "center",
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
              onClick={() => navigate(`/admin/users/${record.taiKhoan}/edit`)}
            />
          </Tooltip>
          <Tooltip title="Xóa">
            <Popconfirm
              title="Bạn có chắc muốn xóa người dùng này?"
              onConfirm={() => {
                handleDelete(record.taiKhoan);
                console.log(record.taiKhoan);
              }}
              okText="Xóa"
              cancelText="Hủy"
            >
              <Button
                // type="link"
                danger
                icon={<DeleteOutlined />}
                // onClick={() => console.log("Xóa", record)}
              />
            </Popconfirm>
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

export default UsersTable;
