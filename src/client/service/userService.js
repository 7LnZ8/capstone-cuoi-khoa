import { GROUP_ID } from '../utils/settings/config';
import { https } from 'baseService';

class UserService {
  // 1. Đăng nhập
  // API: /api/QuanLyNguoiDung/DangNhap 
  loginApi = (thongTinDangNhap) => {
    return https.post('/api/QuanLyNguoiDung/DangNhap', thongTinDangNhap);
  };

  // 2. Đăng ký
  // API: /api/QuanLyNguoiDung/DangKy 
  // Lưu ý: Object đăng ký phải đúng format NguoiDungVMM trong Swagger
  registerApi = (thongTinDangKy) => {
    // Gán mặc định mã nhóm nếu user quên nhập
    const payload = { ...thongTinDangKy, maNhom: GROUP_ID };
    return https.post('/api/QuanLyNguoiDung/DangKy', payload);
  };

  // 3. Lấy thông tin tài khoản (Profile & Khóa học đã ghi danh)
  // API: /api/QuanLyNguoiDung/ThongTinTaiKhoan 
  // Lưu ý: API này method là POST (dù lấy dữ liệu), cần Token Authorization (đã xử lý ở baseService)
  getUserProfileApi = () => {
    return https.post('/api/QuanLyNguoiDung/ThongTinTaiKhoan');
  };

  // 4. Cập nhật thông tin người dùng
  // API: /api/QuanLyNguoiDung/CapNhatThongTinNguoiDung 
  updateUserProfileApi = (formData) => {
     const payload = { ...formData, maNhom: GROUP_ID };
    return https.put('/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung', payload);
  };

  // 5. Lấy danh sách người dùng (Phân trang - Dùng cho Admin)
  // API: /api/QuanLyNguoiDung/LayDanhSachNguoiDung_PhanTrang 
  getUserListApi = (page = 1, pageSize = 10, tuKhoa = '') => {
    // Nếu có từ khóa tìm kiếm thì truyền vào, không thì để rỗng
    const params = tuKhoa 
      ? { MaNhom: GROUP_ID, tuKhoa, page, pageSize } 
      : { MaNhom: GROUP_ID, page, pageSize };
      
    return https.get('/api/QuanLyNguoiDung/LayDanhSachNguoiDung_PhanTrang', { params });
  };
  
  // 6. Xóa người dùng (Dùng cho Admin)
  // API: /api/QuanLyNguoiDung/XoaNguoiDung 
  deleteUserApi = (taiKhoan) => {
    return https.delete('/api/QuanLyNguoiDung/XoaNguoiDung', {
      params: { TaiKhoan: taiKhoan }
    });
  }
}

// Export một instance duy nhất để dùng toàn app (Singleton pattern)
export const userService = new UserService();
// 7. Thêm người dùng (Admin)
  // API: /api/QuanLyNguoiDung/ThemNguoiDung
  addUserApi = (userData) => {
    // Đảm bảo có maNhom
    const payload = { ...userData, maNhom: GROUP_ID }; 
    return https.post('/api/QuanLyNguoiDung/ThemNguoiDung', payload);
  };

  // 8. Lấy danh sách loại người dùng (để đổ vào dropdown menu chọn GV hay HV)
  // API: /api/QuanLyNguoiDung/LayDanhSachLoaiNguoiDung
  getUserTypesApi = () => {
    return https.get('/api/QuanLyNguoiDung/LayDanhSachLoaiNguoiDung');
  };

  // 9. Tìm kiếm người dùng
  // API: /api/QuanLyNguoiDung/TimKiemNguoiDung
  searchUserApi = (tuKhoa) => {
      return https.get('/api/QuanLyNguoiDung/TimKiemNguoiDung', {
          params: { MaNhom: GROUP_ID, tuKhoa }
      });
  };