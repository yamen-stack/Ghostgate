import { useState } from 'react';
import { translations, Translation } from '../types/translations';

export type Language = 'en' | 'ar' | 'fr';

export const useTranslation = () => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>('en');

  const t = (key: keyof Translation): string => {
    return translations[currentLanguage][key] || translations.en[key];
  };

  const changeLanguage = (language: Language) => {
    setCurrentLanguage(language);
  };

  const isRTL = currentLanguage === 'ar';

  return {
    t,
    currentLanguage,
    changeLanguage,
    isRTL
  };
};