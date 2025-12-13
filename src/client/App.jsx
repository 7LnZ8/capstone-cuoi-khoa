
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Profile from './pages/Profile/Profile';
import UserManagement from './pages/Admin/UserManagement';
import Header from './components/Header/Header'; 
import HomePage from './pages/Home/HomePage'; 

function App() {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Header />
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin/users" element={<UserManagement />} />
        </Routes>
      </div>
      <footer className="bg-gray-800 text-white text-center py-6 mt-10">
        <p>&copy; 2024 E-Learning Project. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;