import React, { useState } from 'react';
import { File, Folder } from '../types';
import { FiFolder, FiFolderPlus, FiFile, FiFilePlus, FiRefreshCw, FiChevronDown, FiChevronRight } from 'react-icons/fi';

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
  const [expandedFolders, setExpandedFolders] = useState<string[]>([]);

  const toggleFolder = (folderId: string) => {
    setExpandedFolders(prev =>
      prev.includes(folderId)
        ? prev.filter(id => id !== folderId)
        : [...prev, folderId]
    );
  };

  return (
    <div className="w-64 bg-[#252526] text-[#cccccc] p-2 overflow-y-auto border-r border-[#333333]">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-sm font-semibold">EXPLORER</h2>
        <div className="flex space-x-1">
          <button className="p-1 hover:bg-[#2a2d2e] rounded" onClick={() => onCreateFolder('New Folder')}>
            <FiFolderPlus className="w-4 h-4" />
          </button>
          <button className="p-1 hover:bg-[#2a2d2e] rounded" onClick={() => onCreateFile(folders[0].id, 'New File')}>
            <FiFilePlus className="w-4 h-4" />
          </button>
          <button className="p-1 hover:bg-[#2a2d2e] rounded">
            <FiRefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>
      <ul className="space-y-1">
        {folders.map((folder) => (
          <li key={folder.id}>
            <div
              className="flex items-center p-1 hover:bg-[#2a2d2e] rounded cursor-pointer"
              onClick={() => toggleFolder(folder.id)}
            >
              {expandedFolders.includes(folder.id) ? <FiChevronDown className="w-4 h-4 mr-1" /> : <FiChevronRight className="w-4 h-4 mr-1" />}
              <FiFolder className="w-4 h-4 mr-1" />
              <span className="text-sm">{folder.name}</span>
            </div>
            {expandedFolders.includes(folder.id) && (
              <ul className="ml-4 mt-1 space-y-1">
                {folder.files.map((file) => (
                  <li
                    key={file.id}
                    className={`flex items-center p-1 rounded cursor-pointer ${
                      currentFile && currentFile.id === file.id ? 'bg-[#37373d]' : 'hover:bg-[#2a2d2e]'
                    }`}
                    onClick={() => onFileSelect(file)}
                  >
                    <FiFile className="w-4 h-4 mr-1" />
                    <span className="text-sm truncate">{file.name}</span>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;