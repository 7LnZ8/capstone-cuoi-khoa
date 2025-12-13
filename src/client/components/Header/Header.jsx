import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Header() {
  return (
    <div className="p-4 bg-white shadow-md flex justify-between">
      <NavLink to="/" className="font-bold text-blue-600">CyberSoft E-Learning</NavLink>
      <div>
        <NavLink to="/login" className="mx-2">Đăng Nhập</NavLink>
        <NavLink to="/register" className="mx-2 bg-blue-500 text-white px-3 py-1 rounded">Đăng Ký</NavLink>
      </div>
    </div>
  );
}