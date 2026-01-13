import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// --- LAYOUTS ---
import HomeLayout from '../layouts/HomeLayout/HomeLayout';
import AdminLayout from '../layouts/AdminLayout/AdminLayout';

// --- PAGES: HOME & USER ---
import Home from '../pages/home/Home';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import CourseDetail from '../pages/course-detail/CourseDetail';
import CategoryList from '../pages/category/CategoryList'; // Danh mục khóa học
import CategoryCourses from '../pages/category/CategoryCourses'; // Khóa học theo danh mục
import Profile from '../pages/profile/Profile';

// --- PAGES: ADMIN ---
import CourseManager from '../pages/admin/courses/CourseManager';
import CreateCourse from '../pages/admin/courses/CreateCourse';
import UpdateCourse from '../pages/admin/courses/UpdateCourse';
import UserManager from '../pages/admin/users/UserManager';
import CreateAccount from '../pages/admin/users/CreateAccount';
import UpdateAccount from '../pages/admin/users/UpdateAccount';
import EnrollManager from '../pages/admin/enroll/EnrollManager';

// --- GUARDS (Bảo vệ Route) ---
import AdminRoute from './AdminRoute';
import ProtectedRoute from './ProtectedRoute';

const AppRoutes = () => {
  return (
    <Routes>
      {/* =========================================================
          1. HOME LAYOUT (Khách & Học viên)
          ========================================================= */}
      <Route path="/" element={<HomeLayout />}>
        {/* Trang chủ */}
        <Route index element={<Home />} />
        
        {/* Danh sách khóa học & Chi tiết */}
        <Route path="danh-muc-khoa-hoc" element={<CategoryList />} />
        <Route path="danh-muc/:maDanhMuc" element={<CategoryCourses />} />
        <Route path="khoa-hoc/:maKhoaHoc" element={<CourseDetail />} />

        {/* Trang cá nhân (Cần đăng nhập mới xem được) */}
        <Route element={<ProtectedRoute />}>
           <Route path="profile" element={<Profile />} />
        </Route>
      </Route>

      {/* =========================================================
          2. AUTH (Đăng nhập / Đăng ký - Không có Layout hoặc Layout riêng)
          ========================================================= */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* =========================================================
          3. ADMIN LAYOUT (Chỉ dành cho Quản trị viên)
          ========================================================= */}
      <Route 
        path="/admin" 
        element={
          <AdminRoute>
            <AdminLayout />
          </AdminRoute>
        }
      >
        {/* Redirect /admin -> /admin/courses */}
        <Route index element={<Navigate to="courses" replace />} />

        {/* Quản lý Khóa học */}
        <Route path="courses" element={<CourseManager />} />
        <Route path="courses/add" element={<CreateCourse />} />
        <Route path="courses/edit/:id" element={<UpdateCourse />} />

        {/* Quản lý Người dùng */}
        <Route path="users" element={<UserManager />} />
        <Route path="users/add" element={<CreateAccount />} />
        <Route path="users/edit/:taiKhoan" element={<UpdateAccount />} />

        {/* Quản lý Ghi danh */}
        <Route path="enrollment" element={<EnrollManager />} />
      </Route>

      {/* =========================================================
          4. NOT FOUND (404)
          ========================================================= */}
      <Route path="*" element={<div className="text-center mt-10">Trang không tồn tại (404)</div>} />

    </Routes>
  );
};

export default AppRoutes;