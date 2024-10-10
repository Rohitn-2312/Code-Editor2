import React, { useState } from 'react';
import { File, Folder } from '../types';
import { FiFolder, FiFolderPlus, FiFile, FiFilePlus, FiRefreshCw, FiChevronDown, FiChevronRight, FiTrash2 } from 'react-icons/fi';

interface SidebarProps {
  folders: Folder[];
  currentFile: File | null;
  onFileSelect: (file: File) => void;
  onCreateFile: (folderId: string, name: string) => void;
  onDeleteFile: (folderId: string, fileId: string) => void;
  onCreateFolder: (name: string) => void;
  onDeleteFolder: (id: string) => void;
  width: number;
}

const Sidebar: React.FC<SidebarProps> = ({
  folders,
  currentFile,
  onFileSelect,
  onCreateFile,
  onDeleteFile,
  onCreateFolder,
  onDeleteFolder,
  width,
}) => {
  const [expandedFolders, setExpandedFolders] = useState<string[]>([]);
  const [newFileName, setNewFileName] = useState<string>('');
  const [newFolderName, setNewFolderName] = useState<string>('');
  const [activeFolder, setActiveFolder] = useState<string | null>(null);

  const toggleFolder = (folderId: string) => {
    setExpandedFolders(prev =>
      prev.includes(folderId)
        ? prev.filter(id => id !== folderId)
        : [...prev, folderId]
    );
  };

  const handleCreateFile = (folderId: string) => {
    if (newFileName.trim()) {
      const fileExtension = newFileName.split('.').pop()?.toLowerCase();
      if (['js', 'ts', 'txt'].includes(fileExtension || '')) {
        onCreateFile(folderId, newFileName.trim());
        setNewFileName('');
        setActiveFolder(null);
      } else {
        alert('Please choose a valid file extension (.js, .ts, or .txt)');
      }
    } else {
      alert('Please enter a file name');
    }
  };

  const handleCreateFolder = () => {
    if (newFolderName.trim()) {
      onCreateFolder(newFolderName.trim());
      setNewFolderName('');
    }
  };

  return (
    <div className="bg-[#1e1e1e] text-[#cccccc] p-2 overflow-y-auto border-r border-[#333333] h-full" style={{ width }}>
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-sm font-semibold">EXPLORER</h2>
        <div className="flex space-x-1">
          <button className="p-1 hover:bg-[#2a2d2e] rounded" onClick={handleCreateFolder}>
            <FiFolderPlus className="w-4 h-4" />
          </button>
          <button className="p-1 hover:bg-[#2a2d2e] rounded">
            <FiRefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>
      <input
        type="text"
        value={newFolderName}
        onChange={(e) => setNewFolderName(e.target.value)}
        placeholder="New folder name"
        className="w-full bg-[#3c3c3c] text-white p-1 mb-2 rounded text-sm"
      />
      <ul className="space-y-1">
        {folders.map((folder) => (
          <li key={folder.id}>
            <div className="flex items-center justify-between p-1 hover:bg-[#2a2d2e] rounded">
              <div
                className="flex items-center cursor-pointer"
                onClick={() => toggleFolder(folder.id)}
              >
                {expandedFolders.includes(folder.id) ? <FiChevronDown className="w-4 h-4 mr-1" /> : <FiChevronRight className="w-4 h-4 mr-1" />}
                <FiFolder className="w-4 h-4 mr-1" />
                <span className="text-sm">{folder.name}</span>
              </div>
              <div className="flex items-center">
                <button
                  className="p-1 hover:bg-[#3c3c3c] rounded mr-1"
                  onClick={() => setActiveFolder(activeFolder === folder.id ? null : folder.id)}
                >
                  <FiFilePlus className="w-3 h-3" />
                </button>
                <button
                  className="p-1 hover:bg-[#3c3c3c] rounded"
                  onClick={() => onDeleteFolder(folder.id)}
                >
                  <FiTrash2 className="w-3 h-3" />
                </button>
              </div>
            </div>
            {expandedFolders.includes(folder.id) && (
              <ul className="ml-4 mt-1 space-y-1">
                {folder.files.map((file) => (
                  <li
                    key={file.id}
                    className={`flex items-center justify-between p-1 rounded cursor-pointer ${
                      currentFile && currentFile.id === file.id ? 'bg-[#37373d]' : 'hover:bg-[#2a2d2e]'
                    }`}
                  >
                    <div className="flex items-center" onClick={() => onFileSelect(file)}>
                      <FiFile className="w-4 h-4 mr-1" />
                      <span className="text-sm truncate">{file.name}</span>
                    </div>
                    <button
                      className="p-1 hover:bg-[#3c3c3c] rounded"
                      onClick={() => onDeleteFile(folder.id, file.id)}
                    >
                      <FiTrash2 className="w-3 h-3" />
                    </button>
                  </li>
                ))}
                {activeFolder === folder.id && (
                  <li>
                    <div className="flex items-center mt-1">
                      <input
                        type="text"
                        value={newFileName}
                        onChange={(e) => setNewFileName(e.target.value)}
                        placeholder="New file name"
                        className="flex-grow bg-[#3c3c3c] text-white p-1 rounded-l text-sm"
                      />
                      <button
                        className="bg-[#0e639c] hover:bg-[#1177bb] text-white p-1 rounded-r text-sm"
                        onClick={() => handleCreateFile(folder.id)}
                      >
                        <FiFilePlus className="w-4 h-4" />
                      </button>
                    </div>
                  </li>
                )}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;