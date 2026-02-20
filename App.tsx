
import React from 'react';
import Header from './components/Header';
import ChatInterface from './components/ChatInterface';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans selection:bg-orange-200 selection:text-orange-900">
      <Header />
      
      <main className="flex-1 container mx-auto flex flex-col lg:flex-row items-stretch gap-0 lg:gap-8 lg:px-6">
        {/* Sidebar for Desktop - Contextual Info */}
        <div className="hidden lg:flex lg:flex-col lg:w-1/3 py-8 space-y-6">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
            <h3 className="text-[#2c3e50] font-bold text-lg mb-4 flex items-center">
              <i className="fas fa-book-open mr-2 text-[#e67e22]"></i>
              Document Context
            </h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li className="flex items-start">
                <span className="w-1.5 h-1.5 bg-[#e67e22] rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                <span>Standard Specifications for Road & Bridge Construction (2017 Edition)</span>
              </li>
              <li className="flex items-start">
                <span className="w-1.5 h-1.5 bg-[#e67e22] rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                <span>Volume 3: Full Technical Requirements</span>
              </li>
              <li className="flex items-start">
                <span className="w-1.5 h-1.5 bg-[#e67e22] rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                <span>Covers Pavement, Earthworks, Drainage, Bridges, and more.</span>
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-[#2c3e50] to-[#34495e] p-6 rounded-3xl shadow-lg text-white">
            <h4 className="font-semibold text-orange-400 mb-2 italic">Pro Tip:</h4>
            <p className="text-sm opacity-90 leading-relaxed">
              Ask about specific density requirements for embankments or the classification of bituminous pavement courses for precise engineering answers.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {['#Earthworks', '#Bituminous', '#Concrete', '#Drainage', '#OmanStandards'].map(tag => (
              <span key={tag} className="text-[10px] font-bold uppercase px-3 py-1 bg-white rounded-full border border-gray-200 text-gray-400">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col pt-4 lg:pt-8 h-full min-h-[600px]">
          <div className="px-4 mb-4 lg:hidden">
            <h2 className="text-xl font-bold text-[#2c3e50]">Expert Technical Support</h2>
            <p className="text-sm text-gray-500">Highway Design Standards 2017</p>
          </div>
          <ChatInterface />
        </div>
      </main>

      {/* Footer Branding */}
      <footer className="py-4 text-center text-gray-400 text-xs mt-auto">
        &copy; 2024 Sultanate of Oman. Ministry of Transport, Communications and Information Technology.
      </footer>
    </div>
  );
};

export default App;
