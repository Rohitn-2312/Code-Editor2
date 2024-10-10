import React, { useState, useEffect } from 'react';
import Editor from './components/Editor';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import { Language, File, Folder } from './types';
import { useLocalStorage } from './hooks/useLocalStorage';

const App: React.FC = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<Language>({ code: 'javascript', name: 'JavaScript' });
  const [folders, setFolders] = useLocalStorage<Folder[]>('folders', []);
  const [currentFile, setCurrentFile] = useState<File | null>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    if (folders.length === 0) {
      const newFolder: Folder = { id: '1', name: 'My Project', files: [] };
      const newFile: File = { id: '1', name: 'untitled.js', content: '', language: selectedLanguage };
      newFolder.files.push(newFile);
      setFolders([newFolder]);
      setCurrentFile(newFile);
    } else {
      setCurrentFile(folders[0].files[0] || null);
    }
  }, []);

  const handleLanguageChange = (language: Language) => {
    setSelectedLanguage(language);
    if (currentFile) {
      updateFile({ ...currentFile, language });
    }
  };

  const handleSave = () => {
    if (currentFile) {
      const updatedFolders = folders.map(folder => ({
        ...folder,
        files: folder.files.map(file => 
          file.id === currentFile.id ? { ...file, content: currentFile.content } : file
        )
      }));
      setFolders(updatedFolders);
      localStorage.setItem(`file_${currentFile.id}`, currentFile.content);
      alert('File saved successfully!');
    }
  };

  const handleReset = () => {
    if (currentFile) {
      updateFile({ ...currentFile, content: '' });
    }
  };

  const createFile = (folderId: string, name: string) => {
    const newFile: File = {
      id: Date.now().toString(),
      name,
      content: '',
      language: selectedLanguage,
    };
    const updatedFolders = folders.map(folder => 
      folder.id === folderId ? { ...folder, files: [...folder.files, newFile] } : folder
    );
    setFolders(updatedFolders);
    setCurrentFile(newFile);
  };

  const deleteFile = (folderId: string, fileId: string) => {
    const updatedFolders = folders.map(folder => 
      folder.id === folderId ? { ...folder, files: folder.files.filter(file => file.id !== fileId) } : folder
    );
    setFolders(updatedFolders);
    if (currentFile && currentFile.id === fileId) {
      setCurrentFile(null);
    }
  };

  const updateFile = (updatedFile: File) => {
    const updatedFolders = folders.map(folder => ({
      ...folder,
      files: folder.files.map(file => file.id === updatedFile.id ? updatedFile : file)
    }));
    setFolders(updatedFolders);
    setCurrentFile(updatedFile);
  };

  const createFolder = (name: string) => {
    const newFolder: Folder = {
      id: Date.now().toString(),
      name,
      files: [],
    };
    setFolders([...folders, newFolder]);
  };

  const deleteFolder = (id: string) => {
    const updatedFolders = folders.filter(folder => folder.id !== id);
    setFolders(updatedFolders);
    if (currentFile && !updatedFolders.some(folder => folder.files.some(file => file.id === currentFile.id))) {
      setCurrentFile(null);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#1e1e1e] text-white">
      <Header
        selectedLanguage={selectedLanguage}
        onLanguageChange={handleLanguageChange}
        onSave={handleSave}
        onReset={handleReset}
        theme={theme}
        setTheme={setTheme}
      />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          folders={folders}
          currentFile={currentFile}
          onFileSelect={setCurrentFile}
          onCreateFile={createFile}
          onDeleteFile={deleteFile}
          onCreateFolder={createFolder}
          onDeleteFolder={deleteFolder}
        />
        <Editor
          file={currentFile}
          onChange={(content) => {
            if (currentFile) {
              updateFile({ ...currentFile, content });
            }
          }}
          theme={theme}
          language={selectedLanguage.code}
        />
      </div>
    </div>
  );
};

export default App;