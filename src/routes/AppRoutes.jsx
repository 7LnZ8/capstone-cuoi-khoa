import { Navigate, useRoutes } from "react-router-dom";

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
import ProtectedRoute from "./ProtectedRoute.jsx";
import AdminRoute from "./AdminRoute.jsx";
import CreateAccount from "../pages/admin/users/CreateAccount.jsx";
import EnrollManager from "../pages/admin/enroll/EnrollManager.jsx";
import UpdateAccount from "../pages/admin/users/UpdateAccount.jsx";
import CreateCourse from "../pages/admin/courses/CreateCourse.jsx";
import UpdateCourse from "../pages/admin/courses/UpdateCourse.jsx";
import EnrollUser from "../pages/admin/enroll/userEnroll/ManageUserEnroll.jsx";
import EnrollCourse from "../pages/admin/enroll/courseEnroll/EnrollCourse.jsx";
import ManageUserEnroll from "../pages/admin/enroll/userEnroll/ManageUserEnroll.jsx";

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
            { index: true, element: <Navigate to="courses" replace /> },

            {
              //user manage
              path: "users",
              children: [
                { index: true, element: <UserManager /> },
                { path: "create", element: <CreateAccount /> },
                { path: ":id/edit", element: <UpdateAccount /> },
              ],
            },

            // Courses
            {
              path: "courses",
              children: [
                { index: true, element: <CourseManager /> },

                { path: "create", element: <CreateCourse /> },
                { path: ":id/edit", element: <UpdateCourse /> },
              ],
            },

            {
              path: "enroll",
              children: [
                { index: true, element: <EnrollManager /> },
                { path: "user/:id", element: <ManageUserEnroll /> },
                { path: "course/:id", element: <EnrollCourse /> },
              ],
            },
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
