import React, { useState } from 'react';
import { X, Palette, Type, Eye, Globe, Monitor, Moon, Sun, Zap, Volume2, Bell, Shield } from 'lucide-react';
import { useSettings } from '../contexts/SettingsContext';

interface SettingsHoverProps {
  isVisible: boolean;
  onClose: () => void;
}

const SettingsHover: React.FC<SettingsHoverProps> = ({ isVisible, onClose }) => {
  const { settings, updateSettings } = useSettings();
  const [activeSection, setActiveSection] = useState('appearance');

  if (!isVisible) return null;

  const handleThemeChange = (theme: 'light' | 'dark') => {
    updateSettings({ theme });
  };

  const handleVariantChange = (variant: 'modern-dark' | 'blue-professional' | 'deep-purple') => {
    updateSettings({ themeVariant: variant });
  };

  const handleBackgroundAnimationToggle = () => {
    updateSettings({ backgroundAnimation: !settings.backgroundAnimation });
  };

  const handleApplyChanges = () => {
    // Here you could save settings to localStorage or send to a server
    localStorage.setItem('app-settings', JSON.stringify(settings));
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-black border border-gray-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden relative">
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-purple-500/5 to-transparent opacity-50"></div>
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 via-purple-500 to-cyan-400"></div>
        
        <div className="relative flex h-full">
          {/* Sidebar */}
          <div className="w-80 bg-black/50 border-r border-gray-800 p-6">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-lg border border-cyan-500/30">
                  <Monitor className="w-5 h-5 text-cyan-400" />
                </div>
                <h2 className="text-2xl font-bold text-white tracking-wide">Settings</h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-lg transition-all duration-300"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-2">
              <button 
                onClick={() => setActiveSection('appearance')}
                className={`flex items-center space-x-3 w-full px-4 py-3 rounded-lg transition-all duration-300 ${
                  activeSection === 'appearance'
                    ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-white border border-cyan-500/30 shadow-lg shadow-cyan-500/10'
                    : 'text-gray-400 hover:text-white hover:bg-gray-900/50'
                }`}
              >
                <div className={`p-1.5 rounded-md transition-all duration-300 ${
                  activeSection === 'appearance' ? 'bg-cyan-500/20 text-cyan-400' : 'hover:bg-gray-800/50'
                }`}>
                  <Palette className="w-4 h-4" />
                </div>
                <span className="text-sm font-medium">Appearance</span>
                {activeSection === 'appearance' && (
                  <div className="absolute right-3 w-1 h-6 bg-gradient-to-b from-cyan-400 to-purple-500 rounded-full"></div>
                )}
              </button>
              
              <button 
                onClick={() => setActiveSection('typography')}
                className={`flex items-center space-x-3 w-full px-4 py-3 rounded-lg transition-all duration-300 group relative overflow-hidden ${
                  activeSection === 'typography'
                    ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-white border border-cyan-500/30 shadow-lg shadow-cyan-500/10'
                    : 'text-gray-400 hover:text-white hover:bg-gray-900/50'
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="p-1.5 rounded-md group-hover:bg-gray-800/50 transition-all duration-300 relative z-10">
                  <Type className="w-4 h-4" />
                </div>
                <span className="text-sm font-medium relative z-10">Typography</span>
              </button>
              
              <button 
                onClick={() => setActiveSection('accessibility')}
                className="flex items-center space-x-3 w-full px-4 py-3 rounded-lg text-gray-400 hover:text-white hover:bg-gray-900/50 transition-all duration-300 group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="p-1.5 rounded-md group-hover:bg-gray-800/50 transition-all duration-300 relative z-10">
                  <Eye className="w-4 h-4" />
                </div>
                <span className="text-sm font-medium relative z-10">Accessibility</span>
              </button>
              
              <button 
                onClick={() => setActiveSection('language')}
                className="flex items-center space-x-3 w-full px-4 py-3 rounded-lg text-gray-400 hover:text-white hover:bg-gray-900/50 transition-all duration-300 group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="p-1.5 rounded-md group-hover:bg-gray-800/50 transition-all duration-300 relative z-10">
                  <Globe className="w-4 h-4" />
                </div>
                <span className="text-sm font-medium relative z-10">Language</span>
              </button>
              
              <button 
                onClick={() => setActiveSection('notifications')}
                className="flex items-center space-x-3 w-full px-4 py-3 rounded-lg text-gray-400 hover:text-white hover:bg-gray-900/50 transition-all duration-300 group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="p-1.5 rounded-md group-hover:bg-gray-800/50 transition-all duration-300 relative z-10">
                  <Bell className="w-4 h-4" />
                </div>
                <span className="text-sm font-medium relative z-10">Notifications</span>
              </button>
              
              <button 
                onClick={() => setActiveSection('privacy')}
                className="flex items-center space-x-3 w-full px-4 py-3 rounded-lg text-gray-400 hover:text-white hover:bg-gray-900/50 transition-all duration-300 group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="p-1.5 rounded-md group-hover:bg-gray-800/50 transition-all duration-300 relative z-10">
                  <Shield className="w-4 h-4" />
                </div>
                <span className="text-sm font-medium relative z-10">Privacy</span>
              </button>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="flex-1 p-8 overflow-y-auto">
            {activeSection === 'appearance' && (
              <>
                {/* Theme Section */}
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-white mb-6 tracking-wide">Theme</h3>
                  
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <button
                      onClick={() => handleThemeChange('light')}
                      className={`flex items-center space-x-3 p-4 rounded-lg border transition-all duration-300 ${
                        settings.theme === 'light'
                          ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border-cyan-500/30 text-white'
                          : 'bg-gray-900/30 border-gray-700/50 text-gray-400 hover:border-gray-600/50 hover:text-white'
                      }`}
                    >
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                        settings.theme === 'light' ? 'border-cyan-400' : 'border-gray-600'
                      }`}>
                        {settings.theme === 'light' && <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>}
                      </div>
                      <Sun className="w-5 h-5" />
                      <span className="font-medium">Light</span>
                    </button>
                    
                    <button
                      onClick={() => handleThemeChange('dark')}
                      className={`flex items-center space-x-3 p-4 rounded-lg border transition-all duration-300 ${
                        settings.theme === 'dark'
                          ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border-cyan-500/30 text-white'
                          : 'bg-gray-900/30 border-gray-700/50 text-gray-400 hover:border-gray-600/50 hover:text-white'
                      }`}
                    >
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                        settings.theme === 'dark' ? 'border-cyan-400' : 'border-gray-600'
                      }`}>
                        {settings.theme === 'dark' && <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>}
                      </div>
                      <Moon className="w-5 h-5" />
                      <span className="font-medium">Dark</span>
                    </button>
                  </div>
                </div>
                
                {/* Dark Theme Variants */}
                {settings.theme === 'dark' && (
                  <div className="mb-8">
                    <h3 className="text-xl font-bold text-white mb-6 tracking-wide">Dark Theme Variants</h3>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
                      <button
                        onClick={() => handleVariantChange('modern-dark')}
                        className={`p-6 rounded-lg border transition-all duration-300 text-left ${
                          settings.themeVariant === 'modern-dark'
                            ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border-cyan-500/30'
                            : 'bg-gray-900/30 border-gray-700/50 hover:border-gray-600/50'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="text-lg font-bold text-white">Modern Dark</h4>
                          <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                            settings.themeVariant === 'modern-dark' ? 'border-cyan-400' : 'border-gray-600'
                          }`}>
                            {settings.themeVariant === 'modern-dark' && <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>}
                          </div>
                        </div>
                        <p className="text-gray-400 text-sm">Clean and modern dark theme</p>
                      </button>
                      
                      <button
                        onClick={() => handleVariantChange('blue-professional')}
                        className={`p-6 rounded-lg border transition-all duration-300 text-left ${
                          settings.themeVariant === 'blue-professional'
                            ? 'bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border-blue-500/30'
                            : 'bg-gray-900/30 border-gray-700/50 hover:border-gray-600/50'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="text-lg font-bold text-white">Blue Professional</h4>
                          <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                            settings.themeVariant === 'blue-professional' ? 'border-blue-400' : 'border-gray-600'
                          }`}>
                            {settings.themeVariant === 'blue-professional' && <div className="w-2 h-2 bg-blue-400 rounded-full"></div>}
                          </div>
                        </div>
                        <p className="text-gray-400 text-sm">Professional blue accent</p>
                      </button>
                      
                      <button
                        onClick={() => handleVariantChange('deep-purple')}
                        className={`p-6 rounded-lg border transition-all duration-300 text-left lg:col-span-1 ${
                          settings.themeVariant === 'deep-purple'
                            ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-500/30'
                            : 'bg-gray-900/30 border-gray-700/50 hover:border-gray-600/50'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="text-lg font-bold text-white">Deep Purple</h4>
                          <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                            settings.themeVariant === 'deep-purple' ? 'border-purple-400' : 'border-gray-600'
                          }`}>
                            {settings.themeVariant === 'deep-purple' && <div className="w-2 h-2 bg-purple-400 rounded-full"></div>}
                          </div>
                        </div>
                        <p className="text-gray-400 text-sm">Rich purple tones</p>
                      </button>
                    </div>
                  </div>
                )}
                
                {/* Background Animation */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-white mb-6 tracking-wide">Background Animation</h3>
                  
                  <div className="flex items-center justify-between p-4 bg-gray-900/30 border border-gray-700/50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Zap className="w-5 h-5 text-cyan-400" />
                      <div>
                        <h4 className="text-white font-medium">Animated Particles</h4>
                        <p className="text-gray-400 text-sm">Enable subtle background particle animation</p>
                      </div>
                    </div>
                    
                    <button
                      onClick={handleBackgroundAnimationToggle}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${
                        settings.backgroundAnimation ? 'bg-gradient-to-r from-cyan-500 to-purple-500' : 'bg-gray-600'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
                          settings.backgroundAnimation ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </>
            )}

            {activeSection === 'typography' && (
              <div>
                <h3 className="text-2xl font-bold text-white mb-6 tracking-wide">Typography</h3>
                <p className="text-gray-400">Typography settings will be available in a future update.</p>
              </div>
            )}

            {activeSection === 'accessibility' && (
              <div>
                <h3 className="text-2xl font-bold text-white mb-6 tracking-wide">Accessibility</h3>
                <p className="text-gray-400">Accessibility settings will be available in a future update.</p>
              </div>
            )}

            {activeSection === 'language' && (
              <div>
                <h3 className="text-2xl font-bold text-white mb-6 tracking-wide">Language</h3>
                <p className="text-gray-400">Language settings will be available in a future update.</p>
              </div>
            )}

            {activeSection === 'notifications' && (
              <div>
                <h3 className="text-2xl font-bold text-white mb-6 tracking-wide">Notifications</h3>
                <p className="text-gray-400">Notification settings will be available in a future update.</p>
              </div>
            )}

            {activeSection === 'privacy' && (
              <div>
                <h3 className="text-2xl font-bold text-white mb-6 tracking-wide">Privacy</h3>
                <p className="text-gray-400">Privacy settings will be available in a future update.</p>
              </div>
            )}
            
            {/* Action Buttons */}
            <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-800 mt-8">
              <button
                onClick={onClose}
                className="px-6 py-3 bg-gray-900/50 hover:bg-gray-800/50 text-white rounded-lg transition-all duration-300 font-medium border border-gray-700 hover:border-gray-600"
              >
                Cancel
              </button>
              <button 
                onClick={handleApplyChanges}
                className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-black rounded-lg transition-all duration-300 font-bold tracking-wide shadow-lg shadow-cyan-500/25"
              >
                Apply Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsHover;