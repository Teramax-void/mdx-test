import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SettingsProvider, useSettings } from './contexts/SettingsContext';
import Header from './components/Header';
import CanvasBackground from './components/CanvasBackground';
import HomePage from './pages/HomePage';
import DocumentationPage from './pages/DocumentationPage';
import ComponentsPage from './pages/ComponentsPage';
import CodePage from './pages/CodePage';
import CheatsheetPage from './pages/CheatsheetPage';

function AppContent() {
  const { settings } = useSettings();
  
  // Dynamic theme classes
  const getAppClasses = () => {
    if (settings.theme === 'light') {
      return 'min-h-screen bg-white flex flex-col relative overflow-hidden';
    }
    return 'min-h-screen bg-black flex flex-col relative overflow-hidden';
  };

  const getBackgroundClasses = () => {
    if (settings.theme === 'light') {
      return {
        primary: 'absolute inset-0 bg-gradient-to-br from-gray-100 via-white to-gray-100',
        secondary: 'absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-cyan-500/10 via-transparent to-purple-500/10'
      };
    }
    return {
      primary: 'absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900',
      secondary: 'absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-cyan-500/10 via-transparent to-purple-500/10'
    };
  };

  const backgroundClasses = getBackgroundClasses();

  return (
    <div className={getAppClasses()}>
      {/* Static background gradients */}
      <div className={backgroundClasses.primary}></div>
      <div className={backgroundClasses.secondary}></div>
      
      {/* Canvas Background Animation - positioned between static bg and content */}
      <CanvasBackground />
      
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />
        
        {/* Main content area with top padding to account for fixed header */}
        <div className="pt-20 flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/documentation" element={<DocumentationPage />} />
            <Route path="/components" element={<ComponentsPage />} />
            <Route path="/code" element={<CodePage />} />
            <Route path="/cheatsheet" element={<CheatsheetPage />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <SettingsProvider>
      <Router>
        <AppContent />
      </Router>
    </SettingsProvider>
  );
}

export default App;