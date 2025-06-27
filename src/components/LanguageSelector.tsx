import React from 'react';
import { Globe } from 'lucide-react';
import { Language } from '../hooks/useTranslation';

interface LanguageSelectorProps {
  currentLanguage: Language;
  onLanguageChange: (language: Language) => void;
  isRTL: boolean;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  currentLanguage,
  onLanguageChange,
  isRTL
}) => {
  const languages = [
    { code: 'en' as Language, name: 'English', flag: '🇺🇸' },
    { code: 'ar' as Language, name: 'العربية', flag: '🇸🇦' },
    { code: 'fr' as Language, name: 'Français', flag: '🇫🇷' }
  ];

  return (
    <div className="relative group">
      <button className="flex items-center space-x-2 text-gray-300 hover:text-yellow-400 transition-colors">
        <Globe className="h-5 w-5" />
        <span className="hidden md:inline">
          {languages.find(lang => lang.code === currentLanguage)?.flag}
        </span>
      </button>
      
      <div className={`absolute top-full ${isRTL ? 'left-0' : 'right-0'} mt-2 bg-gray-900 border border-gray-700 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 min-w-[150px]`}>
        {languages.map((language) => (
          <button
            key={language.code}
            onClick={() => onLanguageChange(language.code)}
            className={`w-full px-4 py-2 text-left hover:bg-gray-800 transition-colors flex items-center space-x-2 ${
              currentLanguage === language.code ? 'text-yellow-400' : 'text-gray-300'
            } ${language.code === languages[0].code ? 'rounded-t-lg' : ''} ${
              language.code === languages[languages.length - 1].code ? 'rounded-b-lg' : ''
            }`}
          >
            <span>{language.flag}</span>
            <span>{language.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};