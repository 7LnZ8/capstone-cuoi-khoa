import { Outlet } from "react-router-dom";

export default function HomeLayout() {
  return (
    <div className="home-layout">
      Home Layout
      <Outlet />
    </div>
  );
}
