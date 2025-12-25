//Dashboard admin (sidebar/menu/quản trị)
import { Outlet } from "react-router-dom";
import Navbar from "./NavBar.jsx";
import Footer from "./Footer.jsx";

export default function AdminLayout() {
  return (
    <div className="admin-layout">
      <Navbar />
      <main style={{ minHeight: "100vh" }}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
