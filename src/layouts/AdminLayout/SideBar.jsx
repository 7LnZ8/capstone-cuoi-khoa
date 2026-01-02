import React from "react";
import { NavLink, useMatch } from "react-router-dom";
import { FaBookOpen, FaPlus, FaUsers } from "react-icons/fa";
export default function SideBar() {
  const matchCourses = useMatch("/admin/courses/*");
  const matchCreateCrouse = useMatch("/admin/courses/:id/edit");

  const matchUsers = useMatch("/admin/users/*");
  const matchCreateUsers = useMatch("/admin/users/:id/edit");

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
          {matchCreateCrouse && (
            <NavLink
              to={`/admin/courses/${matchCreateCrouse.params.id}/edit`}
              className={({ isActive }) =>
                `link-route ${isActive ? "active-sidebar" : ""}`
              }
            >
              <FaPlus /> Cập nhật khóa học
            </NavLink>
          )}
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
          {matchCreateUsers && (
            <NavLink
              to={`/admin/users/${matchCreateUsers.params.id}/edit`}
              className={({ isActive }) =>
                `link-route ${isActive ? "active-sidebar" : ""}`
              }
            >
              <FaPlus /> Cập nhật người dùng
            </NavLink>
          )}
        </div>
      )}
    </div>
  );
}
