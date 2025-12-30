// Navbar.jsx
import { Link, useMatch } from "react-router-dom";
import Logo from "./Logo.jsx";
import { Form, Input } from "antd";

export default function Navbar() {
  const matchCourses = useMatch("/admin/courses/*");
  const matchUsers = useMatch("/admin/users/*");
  const matchEnroll = useMatch("/admin/enroll/*");
  return (
    <nav className="navbar navbar-expand-lg shadow-sm">
      <div className="container-fluid nav-wrap">
        <Logo />

        <div className="collapse navbar-collapse nav-left" id="mainNavbar">
          <div className="d-flex align-items-center">
            <Link
              to="/admin/courses"
              className={`link-route ${matchCourses ? "active-navbar" : ""}`}
            >
              QUẢN LÝ KHÓA HỌC
            </Link>
            <Link
              to="/admin/users"
              className={`link-route ${matchUsers ? "active-navbar" : ""}`}
            >
              QUAN LÝ NGƯỜI DÙNG
            </Link>
            <Link
              to="/admin/enroll"
              className={`link-route ${matchEnroll ? "active-navbar" : ""}`}
            >
              QUAN LÝ GHI DANH
            </Link>

            <Form className="d-flex form-look">
              <Input
                className="form-control input-look"
                placeholder="Tìm khóa học..."
              />
              <button className="btn btn-look">Tìm</button>
            </Form>
          </div>

          <div className="ms-auto d-flex nav-right">
            <Link to="/login" className="btn btn-auth">
              Đăng nhập
            </Link>
            <Link to="/register" className="btn btn-auth">
              Đăng xuất
            </Link>
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
