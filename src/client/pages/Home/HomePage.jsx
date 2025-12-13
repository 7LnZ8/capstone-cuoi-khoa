import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Khởi đầu sự nghiệp lập trình của bạn
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-blue-100">
            Học lập trình từ cơ bản đến nâng cao với các dự án thực tế. 
            Lộ trình rõ ràng, mentor tận tâm.
          </p>
          <button 
            onClick={() => navigate('/register')}
            className="px-8 py-3 bg-yellow-400 text-blue-900 font-bold rounded-full hover:bg-yellow-300 transition transform hover:scale-105 shadow-lg"
          >
            Tư vấn lộ trình ngay
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Các khóa học phổ biến</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((item) => (
                <div key={item} className="bg-white rounded-xl shadow hover:shadow-xl transition duration-300 overflow-hidden group">
                    <div className="h-48 bg-gray-300 relative overflow-hidden">
                        <img 
                            src={`https://picsum.photos/300/200?random=${item}`} 
                            alt="Course" 
                            className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                        />
                    </div>
                    <div className="p-5">
                        <span className="text-xs font-bold text-blue-600 bg-blue-100 px-2 py-1 rounded">Front-End</span>
                        <h3 className="font-bold text-lg mt-2 mb-2">Lập trình React JS Chuyên sâu</h3>
                        <div className="flex justify-between items-center mt-4">
                            <span className="text-red-500 font-bold">1.200.000đ</span>
                            <button className="text-gray-500 hover:text-blue-600">
                                Chi tiết &rarr;
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;