import React from 'react';
import { Language } from '../types';
import { FiSave, FiRefreshCw, FiMoon, FiSun } from 'react-icons/fi';

interface HeaderProps {
  selectedLanguage: Language;
  onLanguageChange: (language: Language) => void;
  onSave: () => void;
  onReset: () => void;
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
}

const languages: Language[] = [
  { code: 'js', name: 'JavaScript' },
  { code: 'ts', name: 'TypeScript' },
];

const Header: React.FC<HeaderProps> = ({
  selectedLanguage,
  onLanguageChange,
  onSave,
  onReset,
  theme,
  setTheme,
}) => {
  return (
    <header className="flex items-center justify-between p-2 bg-[#1e1e1e] text-white border-b border-[#333333]">
      <div className="flex items-center space-x-2">
        <select
          value={selectedLanguage.code}
          onChange={(e) => onLanguageChange(languages.find(lang => lang.code === e.target.value)!)}
          className="bg-[#252526] text-white p-1 rounded text-sm focus:outline-none focus:ring-1 focus:ring-[#0e639c]"
        >
          {languages.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.name}
            </option>
          ))}
        </select>
        <button onClick={onSave} className="p-1 hover:bg-[#2a2d2e] rounded">
          <FiSave className="w-4 h-4" />
        </button>
        <button onClick={onReset} className="p-1 hover:bg-[#2a2d2e] rounded">
          <FiRefreshCw className="w-4 h-4" />
        </button>
      </div>
      <button
        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        className="p-1 hover:bg-[#2a2d2e] rounded"
      >
        {theme === 'light' ? <FiMoon className="w-4 h-4" /> : <FiSun className="w-4 h-4" />}
      </button>
    </header>
  );
};

export default Header;