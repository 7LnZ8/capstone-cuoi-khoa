//Chặn trang chỉ dành cho admin
import { Navigate, Outlet } from "react-router-dom";
// import { useAppSelector } from "../app/hooks";

//Component này kiểm tra xem state.auth hoặc state user có data chưa == đã đăng nhập rồi == hoặc đã có accessToken rồi nếu check bằng cách xem accessToken trên cookies. Đã đăng nhập rồi thì đi tiếp tục kiểm tra xem role có phải == "quanTri" (ví dụ)ko và ok hết thì vào vào chilldren Outlet tương đương với các element bên AppRouter
//CHưa đăng nhập thì navigate sang /login hoặc ko phải admin thì đá sáng trang home "/"
export default function AdminRoute() {
  // const { user, role } = useAppSelector((state) => state.auth);
  // if (!user) return <Navigate to="/login" replace />;
  // if (role !== "admin") return <Navigate to="/" replace />;
  return <Outlet />;
}
