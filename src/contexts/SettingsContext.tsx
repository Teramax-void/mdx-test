import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Settings {
  theme: 'light' | 'dark';
  themeVariant: 'modern-dark' | 'blue-professional' | 'deep-purple';
  backgroundAnimation: boolean;
  fontSize: number;
  fontFamily: 'sans-serif' | 'monospace' | 'serif';
  highContrast: boolean;
  keyboardNavigation: boolean;
  language: 'en' | 'es' | 'fr' | 'de';
  notifications: {
    assignmentDue: boolean;
    systemUpdates: boolean;
    messages: boolean;
    style: 'popup' | 'banner';
  };
  customColors: {
    primary: string;
    accent: string;
  };
}

interface SettingsContextType {
  settings: Settings;
  updateSettings: (newSettings: Partial<Settings>) => void;
}

const defaultSettings: Settings = {
  theme: 'dark', // Changed default to dark to show the cyber grid
  themeVariant: 'modern-dark',
  backgroundAnimation: true,
  fontSize: 14,
  fontFamily: 'monospace',
  highContrast: false,
  keyboardNavigation: true,
  language: 'en',
  notifications: {
    assignmentDue: true,
    systemUpdates: false,
    messages: false,
    style: 'popup'
  },
  customColors: {
    primary: '#06b6d4',
    accent: '#8b5cf6'
  }
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};

interface SettingsProviderProps {
  children: ReactNode;
}

export const SettingsProvider: React.FC<SettingsProviderProps> = ({ children }) => {
  const [settings, setSettings] = useState<Settings>(defaultSettings);

  const updateSettings = (newSettings: Partial<Settings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};