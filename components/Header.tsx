
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-[#2c3e50] border-b border-gray-700 py-4 px-6 sticky top-0 z-50 shadow-md">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-[#e67e22] rounded-lg flex items-center justify-center shadow-inner">
            <i className="fas fa-bridge text-white text-xl"></i>
          </div>
          <div>
            <h1 className="text-white font-bold text-lg tracking-tight">Oman Road Expert AI</h1>
            <p className="text-gray-400 text-xs uppercase tracking-widest">2017 Standard Specifications</p>
          </div>
        </div>
        <div className="hidden md:flex space-x-4 items-center">
          <span className="text-xs text-gray-400 px-3 py-1 bg-gray-800 rounded-full border border-gray-700">
            <i className="fas fa-shield-halved mr-1 text-[#e67e22]"></i>
            Ministry of Transport & Communications (DGR LT)
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
