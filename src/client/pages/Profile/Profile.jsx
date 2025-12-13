import React, { useEffect, useState } from 'react';
import { userService } from '../../services/userService';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState({
    taiKhoan: '',
    matKhau: '',
    hoTen: '',
    email: '',
    soDT: '',
    maLoaiNguoiDung: '',
    maNhom: 'GP01',
    chiTietKhoaHocGhiDanh: [] 
  });

  // 1. Gọi API lấy thông tin khi trang vừa load
  useEffect(() => {
    if (!localStorage.getItem('accessToken')) {
        alert('Vui lòng đăng nhập để xem thông tin!');
        navigate('/login');
        return;
    }

    const fetchProfile = async () => {
      try {
        const result = await userService.getUserProfileApi();
        setProfileData(result.data);
        setLoading(false);
      } catch (error) {
        console.error("Lỗi lấy thông tin:", error);
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  // 2. Xử lý thay đổi form (Data Binding)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value,
    });
  };

  // 3. Xử lý Cập nhật thông tin
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      // Gọi API cập nhật
      await userService.updateUserProfileApi(profileData);
      alert("Cập nhật thông tin thành công!");
    } catch (error) {
      console.error(error);
      alert(error.response?.data || "Cập nhật thất bại");
    }
  };

  if (loading) return <div className="text-center mt-10">Đang tải dữ liệu...</div>;

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-3xl font-bold mb-5 text-center">Hồ Sơ Cá Nhân</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1 bg-white p-5 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-4 text-blue-600">Thông tin tài khoản</h3>
          <form onSubmit={handleUpdate} className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Tài khoản (Không thể sửa)</label>
              <input 
                type="text" 
                name="taiKhoan"
                value={profileData.taiKhoan} 
                disabled 
                className="w-full bg-gray-100 border p-2 rounded cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Họ tên</label>
              <input 
                type="text" 
                name="hoTen"
                value={profileData.hoTen} 
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Email</label>
              <input 
                type="email" 
                name="email"
                value={profileData.email} 
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Số điện thoại</label>
              <input 
                type="text" 
                name="soDT"
                value={profileData.soDT} 
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
            </div>
            <div>
               <label className="block text-sm font-medium">Mật khẩu xác nhận</label>
               <input 
                 type="password" 
                 name="matKhau"
                 value={profileData.matKhau || ''}
                 onChange={handleChange}
                 className="w-full border p-2 rounded"
                 placeholder="Nhập mật khẩu để cập nhật"
               />
            </div>

            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
              Cập nhật hồ sơ
            </button>
          </form>
        </div>
        <div className="md:col-span-2">
          <h3 className="text-xl font-semibold mb-4 text-green-600">Khóa học của tôi</h3>
          
          {profileData.chiTietKhoaHocGhiDanh?.length === 0 ? (
             <p>Bạn chưa đăng ký khóa học nào.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {profileData.chiTietKhoaHocGhiDanh?.map((course, index) => (
                <div key={index} className="border p-4 rounded-lg shadow hover:shadow-md transition bg-white flex flex-col justify-between">
                    <div>
                        <img 
                            src={course.hinhAnh} 
                            alt={course.tenKhoaHoc} 
                            className="w-full h-40 object-cover rounded mb-3"
                            onError={(e) => {e.target.src = 'https://via.placeholder.com/300x200'}} // Fallback ảnh lỗi
                        />
                        <h4 className="font-bold text-lg mb-2">{course.tenKhoaHoc}</h4>
                        <p className="text-gray-600 text-sm mb-2">{course.moTa?.substring(0, 80)}...</p>
                    </div>
                    <button className="bg-gray-800 text-white px-3 py-1 rounded text-sm self-start">
                        Xem chi tiết
                    </button>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Profile;