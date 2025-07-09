import React, { useState, useEffect } from 'react';
import { X, Palette, Type, Eye, Globe, Monitor, Moon, Sun, Zap, Volume2, Bell, Shield, User, Sliders, Keyboard, Languages, Accessibility } from 'lucide-react';
import { useSettings } from '../contexts/SettingsContext';

interface SettingsHoverProps {
  isVisible: boolean;
  onClose: () => void;
}

const SettingsHover: React.FC<SettingsHoverProps> = ({ isVisible, onClose }) => {
  const { settings, updateSettings } = useSettings();
  const [activeSection, setActiveSection] = useState('appearance');
  const [previewSettings, setPreviewSettings] = useState(settings);

  // Update preview when settings change
  useEffect(() => {
    setPreviewSettings(settings);
  }, [settings]);

  if (!isVisible) return null;

  const handleThemeChange = (theme: 'light' | 'dark') => {
    const newSettings = { ...previewSettings, theme };
    setPreviewSettings(newSettings);
    updateSettings(newSettings);
  };

  const handleVariantChange = (variant: 'modern-dark' | 'blue-professional' | 'deep-purple') => {
    const newSettings = { ...previewSettings, themeVariant: variant };
    setPreviewSettings(newSettings);
    updateSettings(newSettings);
  };

  const handleBackgroundAnimationToggle = () => {
    const newSettings = { ...previewSettings, backgroundAnimation: !previewSettings.backgroundAnimation };
    setPreviewSettings(newSettings);
    updateSettings(newSettings);
  };

  const handleFontSizeChange = (fontSize: number) => {
    const newSettings = { ...previewSettings, fontSize };
    setPreviewSettings(newSettings);
    updateSettings(newSettings);
  };

  const handleFontFamilyChange = (fontFamily: 'sans-serif' | 'monospace' | 'serif') => {
    const newSettings = { ...previewSettings, fontFamily };
    setPreviewSettings(newSettings);
    updateSettings(newSettings);
  };

  const handleAccessibilityToggle = (feature: 'highContrast' | 'keyboardNavigation') => {
    const newSettings = { ...previewSettings, [feature]: !previewSettings[feature] };
    setPreviewSettings(newSettings);
    updateSettings(newSettings);
  };

  const handleLanguageChange = (language: 'en' | 'es' | 'fr' | 'de') => {
    const newSettings = { ...previewSettings, language };
    setPreviewSettings(newSettings);
    updateSettings(newSettings);
  };

  const handleNotificationToggle = (type: 'assignmentDue' | 'systemUpdates' | 'messages') => {
    const newSettings = {
      ...previewSettings,
      notifications: {
        ...previewSettings.notifications,
        [type]: !previewSettings.notifications[type]
      }
    };
    setPreviewSettings(newSettings);
    updateSettings(newSettings);
  };

  const handleNotificationStyleChange = (style: 'popup' | 'banner') => {
    const newSettings = {
      ...previewSettings,
      notifications: { ...previewSettings.notifications, style }
    };
    setPreviewSettings(newSettings);
    updateSettings(newSettings);
  };


  const handleColorChange = (colorType: 'primary' | 'accent', color: string) => {
    const newSettings = {
      ...previewSettings,
      customColors: { ...previewSettings.customColors, [colorType]: color }
    };
    setPreviewSettings(newSettings);
    updateSettings(newSettings);
  };

  const handleApplyChanges = () => {
    // Save to localStorage
    localStorage.setItem('pro192-settings', JSON.stringify(previewSettings));
    onClose();
  };

  const handleCancel = () => {
    setPreviewSettings(settings);
    onClose();
  };

  const resetToDefaults = () => {
    const defaultSettings = {
      theme: 'dark' as const,
      themeVariant: 'modern-dark' as const,
      backgroundAnimation: true,
      fontSize: 14,
      fontFamily: 'monospace' as const,
      highContrast: false,
      keyboardNavigation: true,
      language: 'en' as const,
      notifications: {
        assignmentDue: true,
        systemUpdates: false,
        messages: false,
        style: 'popup' as const
      },
      customColors: {
        primary: '#06b6d4',
        accent: '#8b5cf6'
      }
    };
    setPreviewSettings(defaultSettings);
    updateSettings(defaultSettings);
  };

  // Dynamic theme classes based on current settings
  const getThemeClasses = () => {
    if (previewSettings.theme === 'light') {
      return {
        modal: 'bg-white border-gray-200',
        sidebar: 'bg-gray-50 border-gray-200',
        text: {
          primary: 'text-gray-900',
          secondary: 'text-gray-600',
          muted: 'text-gray-500'
        },
        button: {
          active: 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-gray-900 border-cyan-500/30',
          inactive: 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
        },
        card: 'bg-gray-50 border-gray-200',
        gradient: 'from-cyan-500/10 to-purple-500/10',
        input: 'bg-white border-gray-300 text-gray-900'
      };
    }
    return {
      modal: 'bg-black border-gray-800',
      sidebar: 'bg-black/50 border-gray-800',
      text: {
        primary: 'text-white',
        secondary: 'text-gray-400',
        muted: 'text-gray-500'
      },
      button: {
        active: 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-white border-cyan-500/30',
        inactive: 'text-gray-400 hover:text-white hover:bg-gray-900/50'
      },
      card: 'bg-gray-900/50 border-gray-700',
      gradient: 'from-cyan-500/5 to-purple-500/5',
      input: 'bg-gray-900 border-gray-700 text-white'
    };
  };

  const themeClasses = getThemeClasses();

  const languages = {
    en: 'English',
    es: 'Español',
    fr: 'Français',
    de: 'Deutsch'
  };


  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[10000] flex items-center justify-center p-4">
      <div className={`${themeClasses.modal} rounded-xl w-full max-h-[90vh] overflow-hidden relative`} style={{ width: '1200px', height: '800px' }}>
        {/* Animated background gradient */}
        <div className={`absolute inset-0 bg-gradient-to-br ${themeClasses.gradient} opacity-50`}></div>
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 via-purple-500 to-cyan-400"></div>
        
        <div className="relative flex h-full">
          {/* Sidebar */}
          <div className={`w-80 ${themeClasses.sidebar} border-r p-6 flex flex-col`}>
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-lg border border-cyan-500/30">
                  <Monitor className="w-5 h-5 text-cyan-400" />
                </div>
                <h2 className={`text-2xl font-bold ${themeClasses.text.primary} tracking-wide`}>Settings</h2>
              </div>
              <button
                onClick={handleCancel}
                className={`p-2 ${themeClasses.text.secondary} hover:${themeClasses.text.primary} hover:bg-gray-800/50 rounded-lg transition-all duration-300`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-2 flex-1">
              {[
                { id: 'appearance', title: 'Appearance', icon: <Palette className="w-4 h-4" /> },
                { id: 'typography', title: 'Typography', icon: <Type className="w-4 h-4" /> },
                { id: 'accessibility', title: 'Accessibility', icon: <Accessibility className="w-4 h-4" /> },
                { id: 'language', title: 'Language', icon: <Languages className="w-4 h-4" /> },
                { id: 'notifications', title: 'Notifications', icon: <Bell className="w-4 h-4" /> }
              ].map((section) => (
                <button 
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`flex items-center space-x-3 w-full px-4 py-3 rounded-lg transition-all duration-300 relative ${
                    activeSection === section.id
                      ? `${themeClasses.button.active} shadow-lg shadow-cyan-500/10`
                      : themeClasses.button.inactive
                  }`}
                >
                  <div className={`p-1.5 rounded-md transition-all duration-300 ${
                    activeSection === section.id ? 'bg-cyan-500/20 text-cyan-400' : 'hover:bg-gray-800/50'
                  }`}>
                    {section.icon}
                  </div>
                  <span className="text-sm font-medium">{section.title}</span>
                  {activeSection === section.id && (
                    <div className="absolute right-3 w-1 h-6 bg-gradient-to-b from-cyan-400 to-purple-500 rounded-full"></div>
                  )}
                </button>
              ))}
            </div>

            {/* Reset Button */}
            <div className="pt-4 border-t border-gray-800">
              <button
                onClick={resetToDefaults}
                className={`w-full px-4 py-2 ${themeClasses.card} hover:bg-gray-800/50 ${themeClasses.text.secondary} rounded-lg transition-all duration-300 text-sm border`}
              >
                Reset to Defaults
              </button>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="flex-1 p-8 overflow-y-auto">
            {activeSection === 'appearance' && (
              <>
                {/* Theme Section */}
                <div className="mb-8">
                  <h3 className={`text-2xl font-bold ${themeClasses.text.primary} mb-6 tracking-wide`}>Theme</h3>
                  
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <button
                      onClick={() => handleThemeChange('light')}
                      className={`flex items-center space-x-3 p-4 rounded-lg border transition-all duration-300 ${
                        previewSettings.theme === 'light'
                          ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border-cyan-500/30 text-gray-900'
                          : `${themeClasses.card} ${themeClasses.text.secondary} hover:border-gray-600/50 hover:${themeClasses.text.primary}`
                      }`}
                    >
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                        previewSettings.theme === 'light' ? 'border-cyan-400' : 'border-gray-600'
                      }`}>
                        {previewSettings.theme === 'light' && <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>}
                      </div>
                      <Sun className="w-5 h-5" />
                      <span className="font-medium">Light</span>
                    </button>
                    
                    <button
                      onClick={() => handleThemeChange('dark')}
                      className={`flex items-center space-x-3 p-4 rounded-lg border transition-all duration-300 ${
                        previewSettings.theme === 'dark'
                          ? `${themeClasses.button.active}`
                          : `${themeClasses.card} ${themeClasses.text.secondary} hover:border-gray-600/50 hover:${themeClasses.text.primary}`
                      }`}
                    >
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                        previewSettings.theme === 'dark' ? 'border-cyan-400' : 'border-gray-600'
                      }`}>
                        {previewSettings.theme === 'dark' && <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>}
                      </div>
                      <Moon className="w-5 h-5" />
                      <span className="font-medium">Dark</span>
                    </button>
                  </div>
                </div>

                {/* Custom Colors */}
                <div className="mb-8">
                  <h3 className={`text-xl font-bold ${themeClasses.text.primary} mb-6 tracking-wide`}>Custom Colors</h3>
                  
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className={`block text-sm font-medium ${themeClasses.text.secondary} mb-2`}>
                        Primary Color
                      </label>
                      <div className="flex items-center space-x-3">
                        <input
                          type="color"
                          value={previewSettings.customColors.primary}
                          onChange={(e) => handleColorChange('primary', e.target.value)}
                          className="w-12 h-12 rounded-lg border border-gray-600 cursor-pointer"
                        />
                        <input
                          type="text"
                          value={previewSettings.customColors.primary}
                          onChange={(e) => handleColorChange('primary', e.target.value)}
                          className={`flex-1 px-3 py-2 ${themeClasses.input} rounded-lg border text-sm font-mono`}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className={`block text-sm font-medium ${themeClasses.text.secondary} mb-2`}>
                        Accent Color
                      </label>
                      <div className="flex items-center space-x-3">
                        <input
                          type="color"
                          value={previewSettings.customColors.accent}
                          onChange={(e) => handleColorChange('accent', e.target.value)}
                          className="w-12 h-12 rounded-lg border border-gray-600 cursor-pointer"
                        />
                        <input
                          type="text"
                          value={previewSettings.customColors.accent}
                          onChange={(e) => handleColorChange('accent', e.target.value)}
                          className={`flex-1 px-3 py-2 ${themeClasses.input} rounded-lg border text-sm font-mono`}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Background Animation */}
                <div className="mb-8">
                  <h3 className={`text-xl font-bold ${themeClasses.text.primary} mb-6 tracking-wide`}>Background Animation</h3>
                  
                  <div className={`flex items-center justify-between p-4 ${themeClasses.card} rounded-lg`}>
                    <div className="flex items-center space-x-3">
                      <Zap className="w-5 h-5 text-cyan-400" />
                      <div>
                        <h4 className={`${themeClasses.text.primary} font-medium`}>Animated Particles</h4>
                        <p className={`${themeClasses.text.secondary} text-sm`}>Enable subtle background particle animation</p>
                      </div>
                    </div>
                    
                    <button
                      onClick={handleBackgroundAnimationToggle}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${
                        previewSettings.backgroundAnimation ? 'bg-gradient-to-r from-cyan-500 to-purple-500' : 'bg-gray-600'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
                          previewSettings.backgroundAnimation ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </>
            )}

            {activeSection === 'typography' && (
              <div className="space-y-8">
                <h3 className={`text-2xl font-bold ${themeClasses.text.primary} mb-6 tracking-wide`}>Typography</h3>
                
                {/* Font Size */}
                <div>
                  <label className={`block text-lg font-medium ${themeClasses.text.primary} mb-4`}>
                    Font Size: {previewSettings.fontSize}px
                  </label>
                  <input
                    type="range"
                    min="10"
                    max="20"
                    value={previewSettings.fontSize}
                    onChange={(e) => handleFontSizeChange(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-2">
                    <span>10px</span>
                    <span>20px</span>
                  </div>
                </div>

                {/* Font Family */}
                <div>
                  <label className={`block text-lg font-medium ${themeClasses.text.primary} mb-4`}>
                    Font Family
                  </label>
                  <div className="grid grid-cols-3 gap-4">
                    {(['sans-serif', 'monospace', 'serif'] as const).map((font) => (
                      <button
                        key={font}
                        onClick={() => handleFontFamilyChange(font)}
                        className={`p-4 rounded-lg border transition-all duration-300 ${
                          previewSettings.fontFamily === font
                            ? `${themeClasses.button.active}`
                            : `${themeClasses.card} hover:border-gray-600`
                        }`}
                        style={{ fontFamily: font }}
                      >
                        <div className="text-center">
                          <div className={`font-medium ${themeClasses.text.primary} mb-1 capitalize`}>
                            {font.replace('-', ' ')}
                          </div>
                          <div className={`text-sm ${themeClasses.text.secondary}`}>
                            Sample Text
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'accessibility' && (
              <div className="space-y-8">
                <h3 className={`text-2xl font-bold ${themeClasses.text.primary} mb-6 tracking-wide`}>Accessibility</h3>
                
                <div className="space-y-6">
                  <div className={`flex items-center justify-between p-4 ${themeClasses.card} rounded-lg`}>
                    <div className="flex items-center space-x-3">
                      <Eye className="w-5 h-5 text-purple-400" />
                      <div>
                        <h4 className={`${themeClasses.text.primary} font-medium`}>High Contrast Mode</h4>
                        <p className={`${themeClasses.text.secondary} text-sm`}>Increase contrast for better visibility</p>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => handleAccessibilityToggle('highContrast')}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${
                        previewSettings.highContrast ? 'bg-gradient-to-r from-purple-500 to-pink-500' : 'bg-gray-600'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
                          previewSettings.highContrast ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>

                  <div className={`flex items-center justify-between p-4 ${themeClasses.card} rounded-lg`}>
                    <div className="flex items-center space-x-3">
                      <Keyboard className="w-5 h-5 text-green-400" />
                      <div>
                        <h4 className={`${themeClasses.text.primary} font-medium`}>Keyboard Navigation</h4>
                        <p className={`${themeClasses.text.secondary} text-sm`}>Enhanced focus indicators for keyboard users</p>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => handleAccessibilityToggle('keyboardNavigation')}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${
                        previewSettings.keyboardNavigation ? 'bg-gradient-to-r from-green-500 to-emerald-500' : 'bg-gray-600'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
                          previewSettings.keyboardNavigation ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'language' && (
              <div className="space-y-8">
                <h3 className={`text-2xl font-bold ${themeClasses.text.primary} mb-6 tracking-wide`}>Language</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(languages).map(([code, name]) => (
                    <button
                      key={code}
                      onClick={() => handleLanguageChange(code as any)}
                      className={`p-4 rounded-lg border transition-all duration-300 ${
                        previewSettings.language === code
                          ? `${themeClasses.button.active}`
                          : `${themeClasses.card} hover:border-gray-600`
                      }`}
                    >
                      <div className="text-center">
                        <div className={`font-medium ${themeClasses.text.primary} mb-1`}>
                          {name}
                        </div>
                        <div className={`text-sm ${themeClasses.text.secondary}`}>
                          {code.toUpperCase()}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {activeSection === 'notifications' && (
              <div className="space-y-8">
                <h3 className={`text-2xl font-bold ${themeClasses.text.primary} mb-6 tracking-wide`}>Notifications</h3>
                
                <div className="space-y-6">
                  {[
                    { key: 'assignmentDue', label: 'Assignment Due', desc: 'Notify when assignments are due' },
                    { key: 'systemUpdates', label: 'System Updates', desc: 'Notify about system updates and maintenance' },
                    { key: 'messages', label: 'Messages', desc: 'Notify about new messages and announcements' }
                  ].map((notification) => (
                    <div key={notification.key} className={`flex items-center justify-between p-4 ${themeClasses.card} rounded-lg`}>
                      <div className="flex items-center space-x-3">
                        <Bell className="w-5 h-5 text-blue-400" />
                        <div>
                          <h4 className={`${themeClasses.text.primary} font-medium`}>{notification.label}</h4>
                          <p className={`${themeClasses.text.secondary} text-sm`}>{notification.desc}</p>
                        </div>
                      </div>
                      
                      <button
                        onClick={() => handleNotificationToggle(notification.key as any)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${
                          previewSettings.notifications[notification.key as keyof typeof previewSettings.notifications] 
                            ? 'bg-gradient-to-r from-blue-500 to-cyan-500' : 'bg-gray-600'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
                            previewSettings.notifications[notification.key as keyof typeof previewSettings.notifications] 
                              ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                  ))}

                  {/* Notification Style */}
                  <div>
                    <h4 className={`text-lg font-medium ${themeClasses.text.primary} mb-4`}>Display Style</h4>
                    <div className="grid grid-cols-2 gap-4">
                      {(['popup', 'banner'] as const).map((style) => (
                        <button
                          key={style}
                          onClick={() => handleNotificationStyleChange(style)}
                          className={`p-4 rounded-lg border transition-all duration-300 ${
                            previewSettings.notifications.style === style
                              ? `${themeClasses.button.active}`
                              : `${themeClasses.card} hover:border-gray-600`
                          }`}
                        >
                          <div className="text-center">
                            <div className={`font-medium ${themeClasses.text.primary} mb-1 capitalize`}>
                              {style}
                            </div>
                            <div className={`text-sm ${themeClasses.text.secondary}`}>
                              {style === 'popup' ? 'Modal overlay' : 'Top banner'}
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}



            
            {/* Action Buttons */}
            <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-800 mt-8">
              <button
                onClick={handleCancel}
                className={`px-6 py-3 ${themeClasses.card} hover:bg-gray-800/50 ${themeClasses.text.primary} rounded-lg transition-all duration-300 font-medium border hover:border-gray-600`}
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