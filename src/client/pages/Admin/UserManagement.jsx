import React, { useState, useEffect } from 'react';
import { userService } from '../../services/userService';

const UserManagement = () => {
  const [userList, setUserList] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userTypes, setUserTypes] = useState([]);
  const [formData, setFormData] = useState({
    taiKhoan: '', matKhau: '', hoTen: '', email: '', soDT: '', maLoaiNguoiDung: 'HV'
  });
  const [isEditMode, setIsEditMode] = useState(false);

  // 1. Gọi API lấy danh sách user và loại user
  useEffect(() => {
    fetchUserList(currentPage, searchKeyword);
    fetchUserTypes();
  }, [currentPage, searchKeyword]); 
  const fetchUserList = async (page, keyword) => {
    try {
      const result = await userService.getUserListApi(page, 10, keyword); 
      setUserList(result.data.items);
      setTotalPages(result.data.totalPages);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchUserTypes = async () => {
    try {
        const result = await userService.getUserTypesApi();
        setUserTypes(result.data);
    } catch (err) { console.error(err); }
  }

  // 2. Xử lý Tìm kiếm (Debounce đơn giản)
  const handleSearch = (e) => {
      setSearchKeyword(e.target.value);
      setCurrentPage(1);
  };

  // 3. Xử lý Xóa
  const handleDelete = async (taiKhoan) => {
    if (window.confirm(`Bạn chắc chắn muốn xóa user ${taiKhoan}?`)) {
      try {
        await userService.deleteUserApi(taiKhoan);
        alert('Xóa thành công');
        fetchUserList(currentPage, searchKeyword);
      } catch (err) {
        alert(err.response?.data || 'Không thể xóa người dùng này!');
      }
    }
  };
  const handleOpenModal = (user = null) => {
      if (user) {
          setIsEditMode(true);
          setFormData({ ...user, matKhau: '' }); 
      } else {
          setIsEditMode(false);
          setFormData({ taiKhoan: '', matKhau: '', hoTen: '', email: '', soDT: '', maLoaiNguoiDung: 'HV' });
      }
      setIsModalOpen(true);
  };

  const handleFormSubmit = async (e) => {
      e.preventDefault();
      try {
          if (isEditMode) {
              await userService.updateUserProfileApi(formData);
              alert('Cập nhật thành công');
          } else {
              await userService.addUserApi(formData);
              alert('Thêm mới thành công');
          }
          setIsModalOpen(false);
          fetchUserList(currentPage, searchKeyword);
      } catch (err) {
          alert(err.response?.data || 'Có lỗi xảy ra');
      }
  };

  const handleFormChange = (e) => {
      setFormData({...formData, [e.target.name]: e.target.value});
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-red-600">Quản Lý Người Dùng</h2>
      
      {/* TOOLBAR: TÌM KIẾM & THÊM */}
      <div className="flex justify-between mb-4">
        <input 
            type="text" 
            placeholder="Nhập tên hoặc tài khoản..." 
            className="border p-2 rounded w-1/3"
            onChange={handleSearch}
        />
        <button 
            onClick={() => handleOpenModal(null)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
            + Thêm người dùng
        </button>
      </div>

      {/* TABLE HIỂN THỊ */}
      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="w-full text-left bg-white">
            <thead className="bg-gray-800 text-white">
                <tr>
                    <th className="p-3">STT</th>
                    <th className="p-3">Tài khoản</th>
                    <th className="p-3">Họ tên</th>
                    <th className="p-3">Email</th>
                    <th className="p-3">Loại</th>
                    <th className="p-3 text-center">Thao tác</th>
                </tr>
            </thead>
            <tbody>
                {userList.map((user, index) => (
                    <tr key={user.taiKhoan} className="border-b hover:bg-gray-50">
                        <td className="p-3">{index + 1 + (currentPage - 1) * 10}</td>
                        <td className="p-3 font-bold">{user.taiKhoan}</td>
                        <td className="p-3">{user.hoTen}</td>
                        <td className="p-3">{user.email}</td>
                        <td className="p-3">
                            <span className={user.maLoaiNguoiDung === 'GV' ? 'text-red-500 font-bold' : 'text-blue-500'}>
                                {user.maLoaiNguoiDung}
                            </span>
                        </td>
                        <td className="p-3 text-center space-x-2">
                            <button 
                                onClick={() => handleOpenModal(user)}
                                className="bg-yellow-400 text-white px-3 py-1 rounded text-sm"
                            >Sửa</button>
                            <button 
                                onClick={() => handleDelete(user.taiKhoan)}
                                className="bg-red-500 text-white px-3 py-1 rounded text-sm"
                            >Xóa</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      <div className="flex justify-center mt-4 space-x-2">
          <button 
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >Trước</button>
          <span className="px-3 py-1 font-bold">Trang {currentPage} / {totalPages}</span>
          <button 
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >Sau</button>
      </div>

      {/* MODAL (POPUP FORM) */}
      {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
              <div className="bg-white p-6 rounded-lg w-96 shadow-xl">
                  <h3 className="text-xl font-bold mb-4">
                      {isEditMode ? 'Cập Nhật Người Dùng' : 'Thêm Người Dùng'}
                  </h3>
                  <form onSubmit={handleFormSubmit} className="space-y-3">
                      <input name="taiKhoan" value={formData.taiKhoan} onChange={handleFormChange} placeholder="Tài khoản" className="w-full border p-2 rounded" disabled={isEditMode} required />
                      <input name="hoTen" value={formData.hoTen} onChange={handleFormChange} placeholder="Họ tên" className="w-full border p-2 rounded" required/>
                      <input name="email" value={formData.email} onChange={handleFormChange} placeholder="Email" type="email" className="w-full border p-2 rounded" required/>
                      <input name="soDT" value={formData.soDT} onChange={handleFormChange} placeholder="Số điện thoại" className="w-full border p-2 rounded" />
                      <input name="matKhau" value={formData.matKhau} onChange={handleFormChange} placeholder="Mật khẩu" type="password" className="w-full border p-2 rounded" required={!isEditMode} />
                      
                      <select name="maLoaiNguoiDung" value={formData.maLoaiNguoiDung} onChange={handleFormChange} className="w-full border p-2 rounded">
                          {userTypes.map((type) => (
                              <option key={type.maLoaiNguoiDung} value={type.maLoaiNguoiDung}>
                                  {type.tenLoaiNguoiDung}
                              </option>
                          ))}
                      </select>

                      <div className="flex justify-end space-x-2 mt-4">
                          <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-gray-600">Hủy</button>
                          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Lưu</button>
                      </div>
                  </form>
              </div>
          </div>
      )}
    </div>
  );
};

export default UserManagement;