import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SettingsProvider, useSettings } from './contexts/SettingsContext';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import DocumentationPage from './pages/DocumentationPage';
import ComponentsPage from './pages/ComponentsPage';
import CodePage from './pages/CodePage';
import CheatsheetPage from './pages/CheatsheetPage';
import './css/background.css';

function AppContent() {
  const { settings } = useSettings();
  
  // Global keyboard shortcut for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        // Trigger search modal
        const searchButton = document.querySelector('[data-search-trigger]') as HTMLButtonElement;
        if (searchButton) {
          searchButton.click();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);
  
  // Dynamic theme classes
  const getAppClasses = () => {
    if (settings.theme === 'light') {
      return 'min-h-screen bg-white relative';
    }
    return 'min-h-screen relative';
  };

  return (
    <div className={getAppClasses()}>
      {/* Cyber Grid Background - Only for dark theme */}
      {settings.theme === 'dark' && (
        <div className="cyber-grid-background"></div>
      )}
      
      {/* Light theme background */}
      {settings.theme === 'light' && (
        <>
          <div className="fixed inset-0 bg-gradient-to-br from-gray-100 via-white to-gray-100"></div>
          <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-cyan-500/10 via-transparent to-purple-500/10"></div>
        </>
      )}
      
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