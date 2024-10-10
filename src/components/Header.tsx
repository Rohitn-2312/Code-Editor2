import React from 'react';
import { Language } from '../types';

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
    <header className="flex items-center justify-between p-4 bg-gray-800 text-gray-200 border-b border-gray-700">
      <div className="flex items-center space-x-4">
        <select
          value={selectedLanguage.code}
          onChange={(e) => onLanguageChange(languages.find(lang => lang.code === e.target.value)!)}
          className="bg-gray-700 text-gray-200 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {languages.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.name}
            </option>
          ))}
        </select>
        <button onClick={onSave} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition duration-200">
          Save
        </button>
        <button onClick={onReset} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition duration-200">
          Reset
        </button>
      </div>
      <button
        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        className="bg-gray-700 hover:bg-gray-600 text-gray-200 px-4 py-2 rounded-md transition duration-200"
      >
        {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
      </button>
    </header>
  );
};

export default Header;