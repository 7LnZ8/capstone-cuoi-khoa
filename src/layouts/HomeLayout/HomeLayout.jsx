import React from 'react';
import { Layout, BackTop } from 'antd'; // BackTop đã lỗi thời ở antd v5, dùng FloatButton.BackTop nếu bạn dùng v5
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const { Content } = Layout;

const HomeLayout = () => {
  return (
    <Layout style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      
      {/* Content sẽ chiếm phần còn lại của màn hình đẩy Footer xuống đáy */}
      <Content style={{ flex: '1 0 auto', backgroundColor: '#f0f2f5' }}>
        {/* Outlet là nơi component con (như Home.jsx) sẽ hiển thị */}
        <Outlet />
      </Content>

      <Footer />
    </Layout>
  );
};

export default HomeLayout;