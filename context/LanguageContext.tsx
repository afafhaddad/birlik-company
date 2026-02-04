import React, { createContext, useState, useContext, useEffect, useMemo } from 'react';
import { Language } from '../types';
import { translations } from '../constants';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
  dir: 'ltr' | 'rtl';
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Helper to check if localStorage is truly accessible
const isLocalStorageAvailable = (): boolean => {
  try {
    const testKey = '__storage_test__';
    window.localStorage.setItem(testKey, testKey);
    window.localStorage.removeItem(testKey);
    return true;
  } catch (e) {
    return false;
  }
};

// Cached availability check
const storageAvailable = isLocalStorageAvailable();

// Helper to safely check and interact with localStorage
const getStorageItem = (key: string): string | null => {
  if (!storageAvailable) return null;
  try {
    return window.localStorage.getItem(key);
  } catch (e) {
    return null;
  }
};

const setStorageItem = (key: string, value: string): void => {
  if (!storageAvailable) return;
  try {
    window.localStorage.setItem(key, value);
  } catch (e) {
    // Fail silently in restricted environments
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const savedLanguage = getStorageItem('birlik-lang');
    return (savedLanguage as Language) || Language.TR;
  });
  
  const dir: 'ltr' | 'rtl' = language === Language.AR ? 'rtl' : 'ltr';

  useEffect(() => {
    setStorageItem('birlik-lang', language);
    try {
      if (document && document.documentElement) {
        document.documentElement.lang = language;
        document.documentElement.dir = dir;
      }
    } catch (e) {
      // Ignore errors related to document property access if any
    }
  }, [language, dir]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };
  
  const t = useMemo(
    () => (key: string) => {
      return translations[language][key as keyof typeof translations[Language.TR]] || key;
    },
    [language]
  );
  
  const value = { language, setLanguage, t, dir };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};