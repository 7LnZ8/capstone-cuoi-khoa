// Navbar.jsx
import { NavLink } from "react-router-dom";
import Logo from "./Logo.jsx";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg shadow-sm">
      <div className="container-fluid nav-wrap">
        <Logo />

        <div className="collapse navbar-collapse nav-left" id="mainNavbar">
          <div className="d-flex align-items-center">
            <NavLink
              to="/admin"
              end
              className={({ isActive }) =>
                `nav-link link-route ${isActive ? "fw-bold text-primary" : ""}`
              }
            >
              QUẢN LÝ KHÓA HỌC
            </NavLink>

            <NavLink
              to="/admin/users"
              className={({ isActive }) =>
                `nav-link link-route ${isActive ? "fw-bold text-primary" : ""}`
              }
            >
              QUAN LÝ NGƯỜI DÙNG
            </NavLink>
            <NavLink
              to="/admin/enroll"
              className={({ isActive }) =>
                `nav-link link-route ${isActive ? "fw-bold text-primary" : ""}`
              }
            >
              QUAN LÝ GHI DANH
            </NavLink>

            <form className="d-flex form-look">
              <input
                className="form-control input-look"
                placeholder="Tìm khóa học..."
              />
              <button className="btn btn-look">Tìm</button>
            </form>
          </div>

          <div className="ms-auto d-flex nav-right">
            <NavLink to="/login" className="btn btn-auth">
              Đăng nhập
            </NavLink>
            <NavLink to="/register" className="btn btn-auth">
              Đăng xuất
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}

// <button
//         className="navbar-toggler"
//         type="button"
//         data-bs-toggle="collapse"
//         data-bs-target="#mainNavbar"
//       >
//         <span className="navbar-toggler-icon"></span>
//       </button>
