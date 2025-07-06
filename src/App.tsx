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
      return 'min-h-screen bg-white relative';
    }
    return 'min-h-screen bg-black relative';
  };

  const getBackgroundClasses = () => {
    if (settings.theme === 'light') {
      return {
        primary: 'fixed inset-0 bg-gradient-to-br from-gray-100 via-white to-gray-100',
        secondary: 'fixed inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-cyan-500/10 via-transparent to-purple-500/10'
      };
    }
    return {
      primary: 'fixed inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900',
      secondary: 'fixed inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-cyan-500/10 via-transparent to-purple-500/10'
    };
  };

  const backgroundClasses = getBackgroundClasses();

  return (
    <div className={getAppClasses()}>
      {/* Static background gradients - Fixed to viewport */}
      <div className={backgroundClasses.primary}></div>
      <div className={backgroundClasses.secondary}></div>
      
      {/* Canvas Background Animation - Fixed to viewport */}
      <CanvasBackground />
      
      {/* Header - Fixed at top */}
      <Header />
      
      {/* Main content area with top padding to account for fixed header */}
      <main className="relative z-[1] pt-20 min-h-screen">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/documentation" element={<DocumentationPage />} />
          <Route path="/components" element={<ComponentsPage />} />
          <Route path="/code" element={<CodePage />} />
          <Route path="/cheatsheet" element={<CheatsheetPage />} />
        </Routes>
      </main>
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