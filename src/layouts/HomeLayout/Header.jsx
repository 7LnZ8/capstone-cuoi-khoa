import React from 'react';
import { Layout, Menu, Button, Space, Avatar, Dropdown, message } from 'antd';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { UserOutlined, LogoutOutlined, AppstoreOutlined, HomeOutlined, ReadOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { logoutAction } from '../../feature/auth/authSlice';
import './HomeLayout.css'; // File CSS tùy chỉnh nếu cần

const { Header: AntHeader } = Layout;

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  // Lấy thông tin user từ Redux store (tự động cập nhật khi Login/Logout)
  const user = useSelector((state) => state.auth?.user);

  const handleLogout = () => {
    dispatch(logoutAction()); // Xóa user trong Redux và LocalStorage
    message.success("Đăng xuất thành công!");
    navigate("/login");
  };

  // Menu dropdown cho User đã đăng nhập
  const userMenu = (
    <Menu items={[
      {
        key: 'profile',
        label: <Link to="/profile">Thông tin cá nhân</Link>,
        icon: <UserOutlined />,
      },
      {
        key: 'logout',
        label: <span onClick={handleLogout}>Đăng xuất</span>,
        icon: <LogoutOutlined />,
        danger: true,
      },
    ]} />
  );

  // Các mục menu chính
  const menuItems = [
    {
      key: '/',
      label: <Link to="/">Trang chủ</Link>,
      icon: <HomeOutlined />,
    },
    {
      key: '/danh-muc-khoa-hoc',
      label: <Link to="/danh-muc-khoa-hoc">Danh mục</Link>,
      icon: <AppstoreOutlined />,
    },
    {
      key: '/khoa-hoc',
      label: <Link to="/khoa-hoc">Khóa học</Link>,
      icon: <ReadOutlined />,
    },
  ];

  return (
    <AntHeader 
      style={{ 
        position: 'sticky', 
        top: 0, 
        zIndex: 1000, 
        width: '100%', 
        display: 'flex', 
        alignItems: 'center',
        justifyContent: 'space-between',
        background: '#fff',
        boxShadow: '0 2px 8px #f0f1f2'
      }}
    >
      {/* 1. LOGO */}
      <div className="logo" style={{ marginRight: 20 }}>
        <Link to="/" style={{ fontSize: 24, fontWeight: 'bold', color: '#1890ff' }}>
          <span style={{ color: '#001529' }}>Cyber</span>Soft
        </Link>
      </div>

      {/* 2. MENU */}
      <Menu
        theme="light"
        mode="horizontal"
        selectedKeys={[location.pathname]}
        items={menuItems}
        style={{ flex: 1, borderBottom: 'none' }}
      />

      {/* 3. AUTH BUTTONS (Đăng nhập/User) */}
      <div className="auth-actions">
        {user ? (
          <Dropdown overlay={userMenu} placement="bottomRight" arrow>
            <Space style={{ cursor: 'pointer' }}>
              <Avatar 
                icon={<UserOutlined />} 
                src={user.hinhAnh || null} // Nếu không có hình thì hiện icon
                style={{ backgroundColor: '#87d068' }}
              />
              <span className="hidden-mobile" style={{ fontWeight: 500 }}>
                {user.hoTen || user.taiKhoan}
              </span>
            </Space>
          </Dropdown>
        ) : (
          <Space>
            <Button type="text" onClick={() => navigate('/login')}>Đăng nhập</Button>
            <Button type="primary" shape="round" onClick={() => navigate('/register')}>
              Đăng ký
            </Button>
          </Space>
        )}
      </div>
    </AntHeader>
  );
};

export default Header;