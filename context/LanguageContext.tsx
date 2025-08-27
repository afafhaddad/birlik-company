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

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem('birlik-lang');
    return (savedLanguage as Language) || Language.TR;
  });
  
  const dir: 'ltr' | 'rtl' = language === Language.AR ? 'rtl' : 'ltr';

  useEffect(() => {
    localStorage.setItem('birlik-lang', language);
    document.documentElement.lang = language;
    document.documentElement.dir = dir;
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
