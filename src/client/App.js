// src/App.js
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Profile from './pages/Profile/Profile';
import UserManagement from './pages/Admin/UserManagement';
function App() {
  return (
    <div className="App">
      {/* Bạn có thể thêm component Header/Navbar ở đây */}
      
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin/users" element={<UserManagement />} />
        {/* Route mặc định hoặc trang chủ */}
        <Route path="/" element={<h1 className="text-center mt-10">Trang Chủ E-Learning</h1>} />
      </Routes>
    </div>
  );
}

export default App;