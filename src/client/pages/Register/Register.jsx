// src/pages/Register/Register.jsx
import React, { useState } from 'react';
import { userService } from '../../services/userService';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  
  // 1. Khởi tạo State lưu giá trị Form
  const [formData, setFormData] = useState({
    taiKhoan: '',
    matKhau: '',
    hoTen: '',
    email: '',
    soDT: '',
  });

  const [errors, setErrors] = useState({}); // Lưu lỗi validation

  // 2. Hàm xử lý thay đổi input (Clean Code: Dùng chung cho tất cả input)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Xóa lỗi khi user bắt đầu gõ lại
    if (errors[name]) {
        setErrors({...errors, [name]: ''});
    }
  };

  // 3. Hàm validate đơn giản
  const validateForm = () => {
      let newErrors = {};
      if (!formData.taiKhoan) newErrors.taiKhoan = "Tài khoản không được để trống";
      if (!formData.matKhau) newErrors.matKhau = "Mật khẩu không được để trống";
      // Regex email đơn giản
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!formData.email || !emailRegex.test(formData.email)) newErrors.email = "Email không hợp lệ";
      
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0; // Trả về true nếu không có lỗi
  };

  // 4. Xử lý Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      // Gọi API từ Service
      await userService.registerApi(formData);
      alert('Đăng ký thành công!');
      navigate('/login'); // Chuyển hướng sang trang đăng nhập
    } catch (err) {
      console.error(err);
      alert(err.response?.data || 'Đăng ký thất bại');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Đăng Ký</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label>Tài Khoản</label>
          <input
            type="text" name="taiKhoan"
            className="border p-2 w-full"
            onChange={handleChange}
          />
          <span className="text-red-500">{errors.taiKhoan}</span>
        </div>
        
        <div>
          <label>Mật Khẩu</label>
          <input
            type="password" name="matKhau"
            className="border p-2 w-full"
            onChange={handleChange}
          />
           <span className="text-red-500">{errors.matKhau}</span>
        </div>

        <div>
          <label>Họ Tên</label>
          <input type="text" name="hoTen" className="border p-2 w-full" onChange={handleChange} />
        </div>

        <div>
          <label>Email</label>
          <input type="email" name="email" className="border p-2 w-full" onChange={handleChange} />
           <span className="text-red-500">{errors.email}</span>
        </div>

        <div>
          <label>Số Điện Thoại</label>
          <input type="text" name="soDT" className="border p-2 w-full" onChange={handleChange} />
        </div>

        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Đăng Ký Ngay
        </button>
      </form>
    </div>
  );
};

export default Register;