//Dashboard admin (sidebar/menu/quản trị)
import { Outlet } from "react-router-dom";
import Navbar from "./NavBar.jsx";
import Footer from "./Footer.jsx";

export default function AdminLayout() {
  return (
    <div className="admin-layout">
      <Navbar />
      <main className="content-admin" style={{ minHeight: "100vh" }}>
        <div className="side-bar">
          <h1>side bar</h1>
        </div>

        <div className="children-admin">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
}
