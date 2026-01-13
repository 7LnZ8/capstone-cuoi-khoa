import React from 'react';
import { Layout, Row, Col, Typography, Space } from 'antd';
import { FacebookOutlined, YoutubeOutlined, InstagramOutlined } from '@ant-design/icons';

const { Footer: AntFooter } = Layout;
const { Title, Text, Link } = Typography;

const Footer = () => {
  return (
    <AntFooter style={{ background: '#001529', color: '#fff', padding: '50px 50px' }}>
      <div className="container" style={{ maxWidth: 1200, margin: '0 auto' }}>
        <Row gutter={[32, 32]}>
          {/* Cột 1: Thông tin chung */}
          <Col xs={24} md={8}>
            <Title level={3} style={{ color: '#fff', marginBottom: 20 }}>CyberSoft</Title>
            <Space direction="vertical" size="middle">
              <Text style={{ color: 'rgba(255,255,255,0.65)' }}>
                Hệ thống đào tạo lập trình chuyên nghiệp. Cam kết chất lượng đầu ra và hỗ trợ việc làm trọn đời.
              </Text>
              <Text style={{ color: 'rgba(255,255,255,0.65)' }}>
                📍 Trụ sở: 123 Đ. Cao Thắng, Q.3, TP.HCM
              </Text>
              <Text style={{ color: 'rgba(255,255,255,0.65)' }}>
                📞 Hotline: 096.105.1014
              </Text>
            </Space>
          </Col>

          {/* Cột 2: Liên kết nhanh */}
          <Col xs={24} md={8}>
            <Title level={4} style={{ color: '#fff' }}>Liên Kết</Title>
            <Space direction="vertical">
              <Link href="#" style={{ color: 'rgba(255,255,255,0.65)' }}>Về chúng tôi</Link>
              <Link href="#" style={{ color: 'rgba(255,255,255,0.65)' }}>Chính sách bảo mật</Link>
              <Link href="#" style={{ color: 'rgba(255,255,255,0.65)' }}>Điều khoản dịch vụ</Link>
              <Link href="#" style={{ color: 'rgba(255,255,255,0.65)' }}>Cơ hội việc làm</Link>
            </Space>
          </Col>

          {/* Cột 3: Mạng xã hội */}
          <Col xs={24} md={8}>
            <Title level={4} style={{ color: '#fff' }}>Kết nối</Title>
            <Space size="large" style={{ fontSize: 24 }}>
              <Link href="#" style={{ color: '#fff' }}><FacebookOutlined /></Link>
              <Link href="#" style={{ color: '#fff' }}><YoutubeOutlined /></Link>
              <Link href="#" style={{ color: '#fff' }}><InstagramOutlined /></Link>
            </Space>
          </Col>
        </Row>
        
        <div style={{ textAlign: 'center', marginTop: 40, borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 20, color: 'rgba(255,255,255,0.45)' }}>
          © 2024 CyberSoft Academy. All Rights Reserved.
        </div>
      </div>
    </AntFooter>
  );
};

export default Footer;