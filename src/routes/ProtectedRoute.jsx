//Chặn trang yêu cầu login
import { Navigate, Outlet } from "react-router-dom";
// import { useAppSelector } from "../app/hooks";

//Component này kiểm tra xem state.auth.user hoặc state user có data chưa == đã đăng nhập rồi == hoặc đã có accessToken rồi nếu check bằng cách xem accessToken trên cookies. Đã đăng nhập rồi thì đi vào chilldren Outlet tương đương với các element bên AppRouter
//CHưa đăng nhập thì navigate sang /login

//Cách này rút ngắn thời gian trong những route kiểm tra xem đã đăng nhập chưa thì mất thời gian, sau này chỉ cần set state bên store là sẽ tự động check trang thái login và admin luôn
export default function ProtectedRoute() {
  // const user = useAppSelector((state) => state.auth.user);
  // if (!user) return <Navigate to="/login" replace />;
  return <Outlet />;
}
