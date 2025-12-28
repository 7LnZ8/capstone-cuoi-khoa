//Khai báo tất cả route của hệ thống
import React from "react";
import { useRoutes } from "react-router-dom";

// Layouts
import HomeLayout from "../layouts/HomeLayout/HomeLayout";
import AdminLayout from "../layouts/AdminLayout/AdminLayout";

// User Pages
import Home from "../pages/home/Home";
import CourseDetail from "../pages/course-detail/CourseDetail";
import Profile from "../pages/profile/Profile";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

//Admin Pages
import UserManager from "../pages/admin/users/UserManager";
import CourseManager from "../pages/admin/courses/CourseManager";
import CourseForm from "../pages/admin/courses/CourseForm";
import CategoryManager from "../pages/admin/categories/CategoryManager";
import CategoryForm from "../pages/admin/categories/CategoryForm";
import ProtectedRoute from "./ProtectedRoute.jsx";
import AdminRoute from "./AdminRoute.jsx";
import CreateAccount from "../pages/admin/courses/CreateAccount.jsx";

export default function AppRouter() {
  const routes = useRoutes([
    // PUBLIC
    {
      path: "/",
      element: <HomeLayout />,
      children: [
        { index: true, element: <Home /> },
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        { path: "courses/:id", element: <CourseDetail /> },

        {
          element: <ProtectedRoute />, //Vào file này xem ghi chú
          children: [{ path: "profile", element: <Profile /> }],
        },
      ],
    },

    // ADMIN
    {
      path: "/admin",
      element: <AdminLayout />,
      children: [
        {
          element: <AdminRoute />, //Vào file này xem ghi chú
          children: [
            // { index: true, element: <CourseManager /> },

            //Account
            { path: "account/create", element: <CreateAccount /> },

            // Courses
            { path: "courses", element: <CourseManager /> },
            { path: "courses/new", element: <CourseForm /> },
            { path: "courses/:id/edit", element: <CourseForm /> },

            // Users
            { path: "users", element: <UserManager /> },

            // Categories
            { path: "categories", element: <CategoryManager /> },
            { path: "categories/new", element: <CategoryForm /> },
            { path: "categories/:id/edit", element: <CategoryForm /> },
          ],
        },
      ],
    },

    {
      path: "*",
      element: (
        <div style={{ textAlign: "center", marginTop: 50 }}>404 Not Found</div>
      ),
    },
  ]);

  return routes;
}
