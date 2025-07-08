import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Settings, Sun, Moon, Zap, Home, BookOpen, Code, Layers, FileText } from 'lucide-react';
import SettingsHover from './SettingsHover';
import SearchModal from './SearchModal';
import { useSettings } from '../contexts/SettingsContext';

const Header: React.FC = () => {
  const location = useLocation();
  const [showSettings, setShowSettings] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const { settings, updateSettings } = useSettings();

  const isActive = (path: string) => {
    return location.pathname === path || (path === '/home' && location.pathname === '/');
  };

  const toggleTheme = () => {
    const newTheme = settings.theme === 'light' ? 'dark' : 'light';
    updateSettings({ theme: newTheme });
  };
  // Dynamic theme classes
  const getHeaderClasses = () => {
    if (settings.theme === 'light') {
      return 'fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-gray-200 px-6 py-4 z-[10000] w-full';
    }
    return 'fixed top-0 left-0 right-0 bg-black/95 backdrop-blur-sm border-b border-gray-800 px-6 py-4 z-[10000] w-full';
  };

  const getTextClasses = () => {
    if (settings.theme === 'light') {
      return {
        primary: 'text-gray-900',
        secondary: 'text-gray-600',
        muted: 'text-gray-500',
        hover: 'hover:text-gray-900',
        active: 'text-cyan-600'
      };
    }
    return {
      primary: 'text-white',
      secondary: 'text-gray-400',
      muted: 'text-gray-500',
      hover: 'hover:text-white',
      active: 'text-cyan-400'
    };
  };

  const getSearchClasses = () => {
    if (settings.theme === 'light') {
      return 'bg-gray-100 border-gray-200 hover:border-cyan-500/50 hover:bg-white';
    }
    return 'bg-gray-900/50 border-gray-700 hover:border-cyan-500/50 hover:bg-gray-800/50';
  };

  const textClasses = getTextClasses();
  const searchClasses = getSearchClasses();

  return (
    <>
      <header className={getHeaderClasses()}>
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/3 via-transparent to-purple-500/3 pointer-events-none"></div>
        
        <div className="relative flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-lg flex items-center justify-center transition-all duration-200">
                  <Zap className="w-5 h-5 text-black font-bold" />
                </div>
              </div>
              <div>
                <span className={`${textClasses.primary} font-bold text-xl tracking-wide group-hover:text-cyan-400 transition-colors duration-200 cyber-glow`}>PRO192</span>
                <div className="text-xs text-cyan-400 font-medium tracking-widest">JAVA EDITION</div>
              </div>
            </Link>
            
            <nav className="flex items-center space-x-8">
              <Link 
                to="/home" 
                className={`flex items-center space-x-2 transition-all duration-200 text-sm font-medium tracking-wide relative group ${
                  isActive('/home') 
                    ? textClasses.active
                    : `${textClasses.secondary} ${textClasses.hover}`
                }`}
              >
                <Home className="w-4 h-4" />
                <span>Home</span>
                <div className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-500 transition-all duration-200 ${
                  isActive('/home') ? 'w-full' : 'w-0 group-hover:w-full'
                }`}></div>
              </Link>
              
              <Link 
                to="/documentation" 
                className={`flex items-center space-x-2 transition-all duration-200 text-sm font-medium tracking-wide relative group ${
                  isActive('/documentation') 
                    ? textClasses.active
                    : `${textClasses.secondary} ${textClasses.hover}`
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span>Documentation</span>
                <div className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-500 transition-all duration-200 ${
                  isActive('/documentation') ? 'w-full' : 'w-0 group-hover:w-full'
                }`}></div>
              </Link>
              
              <Link 
                to="/components" 
                className={`flex items-center space-x-2 transition-all duration-200 text-sm font-medium tracking-wide relative group ${
                  isActive('/components') 
                    ? textClasses.active
                    : `${textClasses.secondary} ${textClasses.hover}`
                }`}
              >
                <Layers className="w-4 h-4" />
                <span>Assignments</span>
                <div className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-500 transition-all duration-200 ${
                  isActive('/components') ? 'w-full' : 'w-0 group-hover:w-full'
                }`}></div>
              </Link>
              
              <Link 
                to="/code" 
                className={`flex items-center space-x-2 transition-all duration-200 text-sm font-medium tracking-wide relative group ${
                  isActive('/code') 
                    ? textClasses.active
                    : `${textClasses.secondary} ${textClasses.hover}`
                }`}
              >
                <Code className="w-4 h-4" />
                <span>Code</span>
                <div className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-500 transition-all duration-200 ${
                  isActive('/code') ? 'w-full' : 'w-0 group-hover:w-full'
                }`}></div>
              </Link>
              
              <Link 
                to="/cheatsheet" 
                className={`flex items-center space-x-2 transition-all duration-200 text-sm font-medium tracking-wide relative group ${
                  isActive('/cheatsheet') 
                    ? textClasses.active
                    : `${textClasses.secondary} ${textClasses.hover}`
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>Cheatsheet</span>
                <div className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-500 transition-all duration-200 ${
                  isActive('/cheatsheet') ? 'w-full' : 'w-0 group-hover:w-full'
                }`}></div>
              </Link>
            </nav>
          </div>
          
          <div className="flex items-center space-x-4">
            <button 
              onClick={toggleTheme}
              className={`p-2 ${textClasses.secondary} ${textClasses.hover} hover:${settings.theme === 'light' ? 'bg-gray-100' : 'bg-gray-800/50'} rounded-lg transition-all duration-200 group`}
              title={`Switch to ${settings.theme === 'light' ? 'dark' : 'light'} mode`}
            >
              {settings.theme === 'light' ? (
                <Moon className="w-5 h-5 group-hover:rotate-12 transition-transform duration-200" />
              ) : (
                <Sun className="w-5 h-5 group-hover:rotate-45 transition-transform duration-200" />
              )}
            </button>
            <button 
              onClick={() => setShowSettings(true)}
              className={`p-2 ${textClasses.secondary} ${textClasses.hover} hover:${settings.theme === 'light' ? 'bg-gray-100' : 'bg-gray-800/50'} rounded-lg transition-all duration-200`}
            >
              <Settings className="w-5 h-5" />
            </button>
            
            {/* Search Button - Opens Modal */}
            <button
              onClick={() => setShowSearch(true)}
              className={`flex items-center space-x-3 ${searchClasses} border rounded-lg px-4 py-2 transition-all duration-300 group min-w-[200px]`}
            >
              <Search className={`w-4 h-4 ${textClasses.secondary} group-hover:text-cyan-400 transition-colors duration-300`} />
              <span className={`text-sm ${textClasses.secondary} group-hover:${textClasses.primary} transition-colors duration-300`}>
                Search everything...
              </span>
              <div className="flex items-center space-x-1 ml-auto">
                <kbd className={`px-1.5 py-0.5 text-xs ${settings.theme === 'light' ? 'bg-gray-200 text-gray-600' : 'bg-gray-800 text-gray-400'} rounded border`}>
                  ⌘
                </kbd>
                <kbd className={`px-1.5 py-0.5 text-xs ${settings.theme === 'light' ? 'bg-gray-200 text-gray-600' : 'bg-gray-800 text-gray-400'} rounded border`}>
                  K
                </kbd>
              </div>
            </button>
          </div>
        </div>
      </header>

      <SettingsHover 
        isVisible={showSettings} 
        onClose={() => setShowSettings(false)} 
      />

      <SearchModal 
        isOpen={showSearch} 
        onClose={() => setShowSearch(false)} 
      />
    </>
  );
};

export default Header;