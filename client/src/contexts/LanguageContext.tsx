import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language } from '@/lib/i18n';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    // Obtener idioma del localStorage o del navegador
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('language') as Language | null;
      if (stored && (stored === 'ca' || stored === 'es')) {
        return stored;
      }
      
      // Detectar idioma del navegador
      const browserLang = navigator.language.split('-')[0];
      return browserLang === 'ca' ? 'ca' : 'es';
    }
    return 'es';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const toggleLanguage = () => {
    setLanguageState(prev => prev === 'ca' ? 'es' : 'ca');
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
