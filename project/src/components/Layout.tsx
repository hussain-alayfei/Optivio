import React from 'react';
import { Glasses, MessageSquare } from 'lucide-react';
import { LayoutProps } from '../types/layout';

const Layout: React.FC<LayoutProps> = ({ children, activeTab, onTabChange }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-violet-950 to-purple-950 text-white flex flex-col">
      <header className="p-4 md:p-6 bg-white/5 backdrop-blur-sm border-b border-white/10">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Glasses className="h-10 w-10 text-violet-400" />
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-violet-400 via-purple-400 to-violet-400 bg-clip-text text-transparent">
              OPTIVIO
            </h1>
          </div>
          
          <div className="flex items-center space-x-6">
            <button
              className={`px-6 py-3 flex items-center transition-all rounded-xl ${
                activeTab === 'dashboard' 
                  ? 'bg-white/10 text-violet-400 font-medium scale-105 shadow-lg' 
                  : 'hover:bg-white/5 text-white/70 hover:text-white'
              }`}
              onClick={() => onTabChange('dashboard')}
            >
              <Glasses className="mr-2" size={20} />
              <span className="text-lg">لوحة المعلومات</span>
            </button>
            <button
              className={`px-6 py-3 flex items-center transition-all rounded-xl ${
                activeTab === 'assistant' 
                  ? 'bg-white/10 text-violet-400 font-medium scale-105 shadow-lg' 
                  : 'hover:bg-white/5 text-white/70 hover:text-white'
              }`}
              onClick={() => onTabChange('assistant')}
            >
              <MessageSquare className="mr-2" size={20} />
              <span className="text-lg">المساعد الطبي</span>
            </button>
          </div>
        </div>
      </header>
      
      <main className="flex-1 container mx-auto p-6 md:p-8">
        {children}
      </main>
    </div>
  );
};

export default Layout;