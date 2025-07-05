import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import EmbedContainer from '../components/EmbedContainer';
import { useSettings } from '../contexts/SettingsContext';

const CodePage: React.FC = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const { settings } = useSettings();

  const handleToggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  // Dynamic theme classes
  const getThemeClasses = () => {
    if (settings.theme === 'light') {
      return {
        sidebar: 'bg-white border-gray-200',
        main: 'bg-gray-50',
        text: {
          primary: 'text-gray-900',
          secondary: 'text-gray-600'
        }
      };
    }
    return {
      sidebar: 'bg-black border-gray-800',
      main: 'bg-black',
      text: {
        primary: 'text-white',
        secondary: 'text-gray-400'
      }
    };
  };

  const themeClasses = getThemeClasses();

  return (
    <div className="flex flex-1 h-full">
      {/* Sidebar - Collapsible with Theme Support */}
      <div className={`${themeClasses.sidebar} border-r flex-shrink-0 transition-all duration-300 ease-in-out ${
        isSidebarCollapsed ? 'w-12' : 'w-80'
      }`}>
        <div className="sticky top-0 h-screen overflow-y-auto">
          <Sidebar 
            isCollapsed={isSidebarCollapsed} 
            onToggleCollapse={handleToggleSidebar}
          />
        </div>
      </div>
      
      <main className={`flex-1 p-8 min-w-0 ${themeClasses.main}`}>
        <div className="max-w-7xl mx-auto h-full flex flex-col">
          <div className={`grid gap-8 transition-all duration-300 h-full flex-grow ${
            isSidebarCollapsed ? 'grid-cols-1 lg:grid-cols-4' : 'grid-cols-1 lg:grid-cols-3'
          }`}>
            {/* Code Editor Embed - Takes up more space when sidebar is collapsed */}
            <div className={`transition-all duration-300 h-full w-full ${
              isSidebarCollapsed ? 'lg:col-span-4' : 'lg:col-span-3'
            }`}>
              <EmbedContainer 
                embedUrl="https://www.jdoodle.com/embed/v1/357eaa8f87a2b133"
                title="HelloWorld Assignment"
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CodePage;