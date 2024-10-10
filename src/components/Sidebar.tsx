import React, { useState } from 'react';
import { File, Folder } from '../types';

interface SidebarProps {
  folders: Folder[];
  currentFile: File | null;
  onFileSelect: (file: File) => void;
  onCreateFile: (folderId: string, name: string) => void;
  onDeleteFile: (folderId: string, fileId: string) => void;
  onCreateFolder: (name: string) => void;
  onDeleteFolder: (id: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  folders,
  currentFile,
  onFileSelect,
  onCreateFile,
  onDeleteFile,
  onCreateFolder,
  onDeleteFolder,
}) => {
  const [newFolderName, setNewFolderName] = useState('');
  const [newFileName, setNewFileName] = useState('');
  const [expandedFolders, setExpandedFolders] = useState<string[]>([]);

  const handleCreateFolder = () => {
    if (newFolderName) {
      onCreateFolder(newFolderName);
      setNewFolderName('');
    }
  };

  const handleCreateFile = (folderId: string) => {
    if (newFileName) {
      onCreateFile(folderId, newFileName);
      setNewFileName('');
    }
  };

  const toggleFolder = (folderId: string) => {
    setExpandedFolders(prev =>
      prev.includes(folderId)
        ? prev.filter(id => id !== folderId)
        : [...prev, folderId]
    );
  };

  return (
    <div className="w-64 bg-gray-800 p-4 overflow-y-auto border-r border-gray-700">
      <h2 className="text-lg font-semibold mb-4 text-gray-200">Project Explorer</h2>
      <div className="mb-4">
        <input
          type="text"
          value={newFolderName}
          onChange={(e) => setNewFolderName(e.target.value)}
          placeholder="New folder name"
          className="w-full p-2 bg-gray-700 text-gray-200 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
        />
        <button
          onClick={handleCreateFolder}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-md transition duration-200"
        >
          Create Folder
        </button>
      </div>
      <ul className="space-y-2">
        {folders.map((folder) => (
          <li key={folder.id} className="mb-2">
            <div
              className="flex items-center justify-between p-2 bg-gray-700 rounded-md cursor-pointer"
              onClick={() => toggleFolder(folder.id)}
            >
              <span>{folder.name}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteFolder(folder.id);
                }}
                className="text-red-400 hover:text-red-300 focus:outline-none"
              >
                Delete
              </button>
            </div>
            {expandedFolders.includes(folder.id) && (
              <ul className="ml-4 mt-2 space-y-1">
                {folder.files.map((file) => (
                  <li
                    key={file.id}
                    className={`flex justify-between items-center p-2 rounded-md cursor-pointer transition duration-200 ${
                      currentFile && currentFile.id === file.id ? 'bg-blue-600' : 'hover:bg-gray-700'
                    }`}
                    onClick={() => onFileSelect(file)}
                  >
                    <span className="truncate">{file.name}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteFile(folder.id, file.id);
                      }}
                      className="text-red-400 hover:text-red-300 focus:outline-none"
                    >
                      Delete
                    </button>
                  </li>
                ))}
                <li className="mt-2">
                  <input
                    type="text"
                    value={newFileName}
                    onChange={(e) => setNewFileName(e.target.value)}
                    placeholder="New file name"
                    className="w-full p-2 bg-gray-700 text-gray-200 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                  />
                  <button
                    onClick={() => handleCreateFile(folder.id)}
                    className="w-full bg-green-500 hover:bg-green-600 text-white p-2 rounded-md transition duration-200"
                  >
                    Create File
                  </button>
                </li>
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;