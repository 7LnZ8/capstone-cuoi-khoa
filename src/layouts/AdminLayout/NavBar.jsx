// Navbar.jsx
import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
      <div className="container-fluid">
        {/* Logo */}
        <NavLink className="navbar-brand" to="/">
          <h2>CYBERMY</h2>
        </NavLink>

        {/* Responsive Button */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Menu */}
        <div className="collapse navbar-collapse" id="mainNavbar">
          <div className="d-flex align-items-center gap-3">
            <NavLink
              to="/admin/courses"
              end
              className={({ isActive }) =>
                `nav-link ${isActive ? "fw-bold text-primary" : ""}`
              }
            >
              Quản Lý Khóa Học
            </NavLink>

            <NavLink
              to="/admin/courses/new"
              className={({ isActive }) =>
                `nav-link ${isActive ? "fw-bold text-primary" : ""}`
              }
            >
              Thêm Khóa Học
            </NavLink>
            {/* 
            <NavLink
              to="/admin/courses/:id/new"
              className={({ isActive }) =>
                `nav-link ${isActive ? "fw-bold text-primary" : ""}`
              }
            >
              Teach
            </NavLink> */}

            {/* Form Search */}
            <form className="d-flex">
              <input
                className="form-control"
                placeholder="Search for anything"
              />
            </form>
          </div>

          {/* Right side */}
          <div className="ms-auto d-flex align-items-center gap-2">
            <NavLink to="/login" className="btn btn-outline-primary">
              Login
            </NavLink>
            <NavLink to="/register" className="btn btn-primary">
              Sign Up
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}
