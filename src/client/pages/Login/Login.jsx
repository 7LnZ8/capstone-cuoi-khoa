// src/pages/Login/Login.jsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUserAsync } from '../../redux/slices/userSlice';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Lấy state từ Redux để hiển thị loading hoặc lỗi
  const { isLoading, error } = useSelector((state) => state.user);

  const [loginData, setLoginData] = useState({
    taiKhoan: '',
    matKhau: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Dispatch Async Thunk
    dispatch(loginUserAsync(loginData))
      .unwrap() // Hàm giúp tách kết quả promise (thành công hay thất bại)
      .then((result) => {
        alert(`Xin chào, ${result.hoTen}!`);
        navigate('/'); // Chuyển về trang chủ sau khi đăng nhập xong
      })
      .catch((errPayload) => {
        // Lỗi đã được xử lý trong slice, ở đây chỉ cần thông báo nếu muốn
        // (errPayload chính là message lỗi từ server)
        console.error("Lỗi đăng nhập:", errPayload);
      });
  };

  return (
    <div className="container mx-auto p-4 max-w-md">
      <h2 className="text-2xl font-bold mb-4">Đăng Nhập</h2>
      
      {/* Hiển thị lỗi nếu có từ Redux */}
      {error && <div className="bg-red-100 text-red-700 p-2 mb-4 rounded">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label>Tài Khoản</label>
          <input
            type="text" name="taiKhoan"
            className="border p-2 w-full"
            onChange={handleChange}
          />
        </div>
        
        <div>
          <label>Mật Khẩu</label>
          <input
            type="password" name="matKhau"
            className="border p-2 w-full"
            onChange={handleChange}
          />
        </div>

        <button 
          type="submit" 
          className="bg-green-500 text-white p-2 rounded w-full"
          disabled={isLoading} // Disable nút khi đang loading
        >
          {isLoading ? 'Đang xử lý...' : 'Đăng Nhập'}
        </button>
      </form>
    </div>
  );
};

export default Login;