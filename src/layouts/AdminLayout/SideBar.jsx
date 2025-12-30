import React from "react";
import { NavLink, useMatch } from "react-router-dom";
import { FaBookOpen, FaPlus, FaUsers } from "react-icons/fa";
export default function SideBar() {
  const matchCourses = useMatch("/admin/courses/*");
  const matchUsers = useMatch("/admin/users/*");

  return (
    <div className="side-bar">
      {matchCourses && (
        <div>
          <NavLink
            to="/admin/courses"
            end
            className={({ isActive }) =>
              `link-route ${isActive ? "active-sidebar" : ""}`
            }
          >
            <FaBookOpen /> Danh sách Khóa Học
          </NavLink>
          <NavLink
            to="/admin/courses/create"
            className={({ isActive }) =>
              `link-route ${isActive ? "active-sidebar" : ""}`
            }
          >
            <FaPlus /> Thêm Khóa Học
          </NavLink>
        </div>
      )}
      {matchUsers && (
        <div>
          <NavLink
            to="/admin/users"
            end
            className={({ isActive }) =>
              `link-route ${isActive ? "active-sidebar" : ""}`
            }
          >
            <FaUsers /> Danh sách Người Dùng
          </NavLink>
          <NavLink
            to="/admin/users/create"
            className={({ isActive }) =>
              `link-route ${isActive ? "active-sidebar" : ""}`
            }
          >
            <FaPlus /> Thêm Người Dùng
          </NavLink>
        </div>
      )}
    </div>
  );
}
