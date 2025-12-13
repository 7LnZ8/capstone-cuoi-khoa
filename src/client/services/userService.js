import { GROUP_ID } from '../utils/setting/config'; 
import { https } from './baseService'; 

class UserService {
  // 1. Đăng nhập
  loginApi = (thongTinDangNhap) => {
    return https.post('/api/QuanLyNguoiDung/DangNhap', thongTinDangNhap);
  };

  // 2. Đăng ký
  registerApi = (thongTinDangKy) => {
    const payload = { ...thongTinDangKy, maNhom: GROUP_ID };
    return https.post('/api/QuanLyNguoiDung/DangKy', payload);
  };

  // 3. Lấy thông tin tài khoản
  getUserProfileApi = () => {
    return https.post('/api/QuanLyNguoiDung/ThongTinTaiKhoan');
  };

  // 4. Cập nhật thông tin
  updateUserProfileApi = (formData) => {
     const payload = { ...formData, maNhom: GROUP_ID };
    return https.put('/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung', payload);
  };

  // 5. Lấy danh sách user (Admin)
  getUserListApi = (page = 1, pageSize = 10, tuKhoa = '') => {
    const params = tuKhoa 
      ? { MaNhom: GROUP_ID, tuKhoa, page, pageSize } 
      : { MaNhom: GROUP_ID, page, pageSize };
    return https.get('/api/QuanLyNguoiDung/LayDanhSachNguoiDung_PhanTrang', { params });
  };
  
  // 6. Xóa user
  deleteUserApi = (taiKhoan) => {
    return https.delete('/api/QuanLyNguoiDung/XoaNguoiDung', {
      params: { TaiKhoan: taiKhoan }
    });
  }

  // 7. Thêm người dùng (Admin) - Đã đưa vào trong class
  addUserApi = (userData) => {
    const payload = { ...userData, maNhom: GROUP_ID }; 
    return https.post('/api/QuanLyNguoiDung/ThemNguoiDung', payload);
  };

  // 8. Lấy danh sách loại người dùng
  getUserTypesApi = () => {
    return https.get('/api/QuanLyNguoiDung/LayDanhSachLoaiNguoiDung');
  };

  // 9. Tìm kiếm người dùng
  searchUserApi = (tuKhoa) => {
      return https.get('/api/QuanLyNguoiDung/TimKiemNguoiDung', {
          params: { MaNhom: GROUP_ID, tuKhoa }
      });
  };
}

export const userService = new UserService();