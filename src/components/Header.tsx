import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Settings, Sun, Zap, Home, BookOpen, Code, Layers, FileText } from 'lucide-react';
import SettingsHover from './SettingsHover';

const Header: React.FC = () => {
  const location = useLocation();
  const [showSettings, setShowSettings] = useState(false);

  const isActive = (path: string) => {
    return location.pathname === path || (path === '/home' && location.pathname === '/');
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 bg-black border-b border-gray-800 px-6 py-4 relative overflow-hidden z-50 will-change-auto">
        {/* Subtle gradient overlay - Fixed positioning */}
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-transparent to-purple-500/5 pointer-events-none"></div>
        
        <div className="relative flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-lg flex items-center justify-center shadow-lg shadow-cyan-500/25 group-hover:shadow-cyan-500/40 transition-all duration-300">
                  <Zap className="w-5 h-5 text-black font-bold" />
                </div>
                <div className="absolute -inset-1 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-lg blur opacity-30 animate-pulse group-hover:opacity-50 transition-opacity duration-300"></div>
              </div>
              <div>
                <span className="text-white font-bold text-xl tracking-wide group-hover:text-cyan-400 transition-colors duration-300">PRO192</span>
                <div className="text-xs text-cyan-400 font-medium tracking-widest">JAVA EDITION</div>
              </div>
            </Link>
            
            <nav className="flex items-center space-x-8">
              <Link 
                to="/home" 
                className={`flex items-center space-x-2 transition-all duration-300 text-sm font-medium tracking-wide relative group ${
                  isActive('/home') 
                    ? 'text-cyan-400' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Home className="w-4 h-4" />
                <span>Home</span>
                <div className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-500 transition-all duration-300 ${
                  isActive('/home') ? 'w-full' : 'w-0 group-hover:w-full'
                }`}></div>
              </Link>
              
              <Link 
                to="/documentation" 
                className={`flex items-center space-x-2 transition-all duration-300 text-sm font-medium tracking-wide relative group ${
                  isActive('/documentation') 
                    ? 'text-cyan-400' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span>Documentation</span>
                <div className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-500 transition-all duration-300 ${
                  isActive('/documentation') ? 'w-full' : 'w-0 group-hover:w-full'
                }`}></div>
              </Link>
              
              <Link 
                to="/components" 
                className={`flex items-center space-x-2 transition-all duration-300 text-sm font-medium tracking-wide relative group ${
                  isActive('/components') 
                    ? 'text-cyan-400' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Layers className="w-4 h-4" />
                <span>Assignments</span>
                <div className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-500 transition-all duration-300 ${
                  isActive('/components') ? 'w-full' : 'w-0 group-hover:w-full'
                }`}></div>
              </Link>
              
              <Link 
                to="/code" 
                className={`flex items-center space-x-2 transition-all duration-300 text-sm font-medium tracking-wide relative group ${
                  isActive('/code') 
                    ? 'text-cyan-400' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Code className="w-4 h-4" />
                <span>Code</span>
                <div className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-500 transition-all duration-300 ${
                  isActive('/code') ? 'w-full' : 'w-0 group-hover:w-full'
                }`}></div>
              </Link>
              
              <Link 
                to="/cheatsheet" 
                className={`flex items-center space-x-2 transition-all duration-300 text-sm font-medium tracking-wide relative group ${
                  isActive('/cheatsheet') 
                    ? 'text-cyan-400' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>Cheatsheet</span>
                <div className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-500 transition-all duration-300 ${
                  isActive('/cheatsheet') ? 'w-full' : 'w-0 group-hover:w-full'
                }`}></div>
              </Link>
            </nav>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-lg transition-all duration-300 group">
              <Sun className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
            </button>
            <button 
              onClick={() => setShowSettings(true)}
              className="p-2 text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-lg transition-all duration-300"
            >
              <Settings className="w-5 h-5" />
            </button>
            <div className="flex items-center space-x-3 bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-2 hover:border-cyan-500/50 transition-all duration-300 group">
              <Search className="w-4 h-4 text-gray-400 group-hover:text-cyan-400 transition-colors duration-300" />
              <span className="text-sm text-gray-400 group-hover:text-white transition-colors duration-300">Search</span>
            </div>
          </div>
        </div>
      </header>

      <SettingsHover 
        isVisible={showSettings} 
        onClose={() => setShowSettings(false)} 
      />
    </>
  );
};

export default Header;