import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Settings, Sun, Zap, Home, BookOpen, Code, Layers, FileText } from 'lucide-react';
import SettingsHover from './SettingsHover';
import { useSettings } from '../contexts/SettingsContext';

const Header: React.FC = () => {
  const location = useLocation();
  const [showSettings, setShowSettings] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const { settings } = useSettings();

  const isActive = (path: string) => {
    return location.pathname === path || (path === '/home' && location.pathname === '/');
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
      return {
        container: `bg-gray-100 border-gray-200 hover:border-cyan-500/50 focus-within:border-cyan-500 focus-within:bg-white ${isSearchFocused ? 'border-cyan-500 bg-white shadow-lg shadow-cyan-500/10' : ''}`,
        input: 'bg-transparent text-gray-900 placeholder-gray-500',
        icon: `${isSearchFocused ? 'text-cyan-500' : 'text-gray-500'} group-hover:text-cyan-500`
      };
    }
    return {
      container: `bg-gray-900/50 border-gray-700 hover:border-cyan-500/50 focus-within:border-cyan-500 focus-within:bg-gray-800/50 ${isSearchFocused ? 'border-cyan-500 bg-gray-800/50 shadow-lg shadow-cyan-500/10' : ''}`,
      input: 'bg-transparent text-white placeholder-gray-400',
      icon: `${isSearchFocused ? 'text-cyan-400' : 'text-gray-400'} group-hover:text-cyan-400`
    };
  };

  const textClasses = getTextClasses();
  const searchClasses = getSearchClasses();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Here you would implement search functionality
      console.log('Searching for:', searchQuery);
      // For now, we'll just show an alert
      alert(`Searching for: "${searchQuery}"`);
    }
  };

  const handleSearchFocus = () => {
    setIsSearchFocused(true);
  };

  const handleSearchBlur = () => {
    setIsSearchFocused(false);
  };

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
            <button className={`p-2 ${textClasses.secondary} ${textClasses.hover} hover:bg-gray-800/50 rounded-lg transition-all duration-200 group`}>
              <Sun className="w-5 h-5 group-hover:rotate-45 transition-transform duration-200" />
            </button>
            
            <button 
              onClick={() => setShowSettings(true)}
              className={`p-2 ${textClasses.secondary} ${textClasses.hover} hover:bg-gray-800/50 rounded-lg transition-all duration-200`}
            >
              <Settings className="w-5 h-5" />
            </button>
            
            {/* Enhanced Search Bar */}
            <form onSubmit={handleSearchSubmit} className="relative">
              <div className={`flex items-center space-x-3 border rounded-lg px-4 py-2 transition-all duration-300 group min-w-[200px] ${searchClasses.container}`}>
                <Search className={`w-4 h-4 transition-all duration-300 ${searchClasses.icon}`} />
                <input
                  type="text"
                  placeholder="Search documentation..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={handleSearchFocus}
                  onBlur={handleSearchBlur}
                  className={`text-sm outline-none flex-1 transition-all duration-300 ${searchClasses.input}`}
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className={`text-xs ${textClasses.secondary} ${textClasses.hover} transition-colors duration-200`}
                  >
                    ✕
                  </button>
                )}
              </div>
              
              {/* Search suggestions dropdown (when focused and has query) */}
              {isSearchFocused && searchQuery && (
                <div className={`absolute top-full left-0 right-0 mt-2 ${settings.theme === 'light' ? 'bg-white border-gray-200' : 'bg-gray-900 border-gray-700'} border rounded-lg shadow-xl z-50 max-h-64 overflow-y-auto`}>
                  <div className="p-2">
                    <div className={`text-xs ${textClasses.muted} uppercase tracking-widest font-semibold mb-2 px-2`}>
                      Search Results
                    </div>
                    <div className="space-y-1">
                      <button className={`w-full text-left px-3 py-2 rounded-md ${textClasses.secondary} hover:${settings.theme === 'light' ? 'bg-gray-100' : 'bg-gray-800'} transition-colors duration-200 text-sm`}>
                        <div className={`font-medium ${textClasses.primary}`}>Java Basics</div>
                        <div className={`text-xs ${textClasses.muted}`}>Documentation → Core Concepts</div>
                      </button>
                      <button className={`w-full text-left px-3 py-2 rounded-md ${textClasses.secondary} hover:${settings.theme === 'light' ? 'bg-gray-100' : 'bg-gray-800'} transition-colors duration-200 text-sm`}>
                        <div className={`font-medium ${textClasses.primary}`}>Object-Oriented Programming</div>
                        <div className={`text-xs ${textClasses.muted}`}>Documentation → Advanced Topics</div>
                      </button>
                      <button className={`w-full text-left px-3 py-2 rounded-md ${textClasses.secondary} hover:${settings.theme === 'light' ? 'bg-gray-100' : 'bg-gray-800'} transition-colors duration-200 text-sm`}>
                        <div className={`font-medium ${textClasses.primary}`}>HelloWorld Assignment</div>
                        <div className={`text-xs ${textClasses.muted}`}>Assignments → Beginner</div>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </form>
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