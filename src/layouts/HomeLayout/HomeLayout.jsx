import { Outlet } from "react-router-dom";
import { NavLink } from "react-router-dom";
export default function HomeLayout() {
  return (
    <div className="home-layout">
      <NavLink to="/admin">Admin</NavLink>
      Home Layout
      <Outlet />
    </div>
  );
}
