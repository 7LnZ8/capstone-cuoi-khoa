import { useUserProfile } from "../../queries/user.queries.js";
import { Spin, Table, Tabs } from "antd";

export default function Profile() {
  const { data: userProfile, isLoading } = useUserProfile();

  if (isLoading) return <Spin fullscreen />;

  // Cột cho bảng khóa học đã đăng ký
  const columns = [
    { title: "Tên khóa học", dataIndex: "tenKhoaHoc", key: "tenKhoaHoc" },
    { title: "Mã khóa học", dataIndex: "maKhoaHoc", key: "maKhoaHoc" },
    {
      title: "Hình ảnh",
      dataIndex: "hinhAnh",
      key: "hinhAnh",
      render: (img) => <img src={img} alt="course" width={50} />,
    },
  ];

  return (
    <div style={{ padding: 20 }}>
      <h1>Hồ sơ cá nhân</h1>

      <div className="info-box">
        <p>
          <strong>Tài khoản:</strong> {userProfile?.taiKhoan}
        </p>
        <p>
          <strong>Họ tên:</strong> {userProfile?.hoTen}
        </p>
        <p>
          <strong>Email:</strong> {userProfile?.email}
        </p>
        <p>
          <strong>Số ĐT:</strong> {userProfile?.soDT}
        </p>
      </div>

      <div style={{ marginTop: 20 }}>
        <h3>Khóa học đã tham gia</h3>
        {/* data chiTietKhoaHocGhiDanh trả về từ API ThongTinTaiKhoan */}
        <Table
          dataSource={userProfile?.chiTietKhoaHocGhiDanh}
          columns={columns}
          rowKey="maKhoaHoc"
        />
      </div>
    </div>
  );
}
