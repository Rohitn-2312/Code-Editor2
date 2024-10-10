import React from 'react';
import MonacoEditor from '@monaco-editor/react';
import { File } from '../types';
import { FiCode, FiPlay } from 'react-icons/fi';

interface EditorProps {
  file: File | null;
  onChange: (content: string) => void;
  theme: 'light' | 'dark';
  language: string;
  onRun: () => void;
}

const Editor: React.FC<EditorProps> = ({ file, onChange, theme, language, onRun }) => {
  if (!file) return null;

  const handleEditorDidMount = (editor: any, monaco: any) => {
    monaco.editor.defineTheme('myCustomTheme', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: 'comment', foreground: '6A9955', fontStyle: 'italic' },
        { token: 'keyword', foreground: '569CD6' },
        { token: 'string', foreground: 'CE9178' },
        { token: 'number', foreground: 'B5CEA8' },
        { token: 'regexp', foreground: 'D16969' },
        { token: 'operator', foreground: 'D4D4D4' },
        { token: 'namespace', foreground: '4EC9B0' },
        { token: 'type', foreground: '4EC9B0' },
        { token: 'struct', foreground: '4EC9B0' },
        { token: 'class', foreground: '4EC9B0' },
        { token: 'interface', foreground: '4EC9B0' },
        { token: 'enum', foreground: '4EC9B0' },
        { token: 'typeParameter', foreground: '4EC9B0' },
        { token: 'function', foreground: 'DCDCAA' },
        { token: 'member', foreground: '9CDCFE' },
        { token: 'macro', foreground: 'BD63C5' },
        { token: 'variable', foreground: '9CDCFE' },
        { token: 'parameter', foreground: '9CDCFE' },
        { token: 'property', foreground: '9CDCFE' },
        { token: 'label', foreground: '9CDCFE' },
      ],
      colors: {
        'editor.background': '#1E1E1E',
        'editor.foreground': '#D4D4D4',
        'editorCursor.foreground': '#FFFFFF',
        'editor.lineHighlightBackground': '#2F3139',
        'editorLineNumber.foreground': '#858585',
        'editor.selectionBackground': '#264F78',
        'editor.inactiveSelectionBackground': '#3A3D41'
      }
    });
    monaco.editor.setTheme('myCustomTheme');

    // Add format document command
    editor.addAction({
      id: 'format-document',
      label: 'Format Document',
      keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.KeyF],
      run: async (ed: any) => {
        await ed.getAction('editor.action.formatDocument').run();
      }
    });
  };

  const handleFormatCode = (editor: any) => {
    editor.getAction('editor.action.formatDocument').run();
  };

  return (
    <div className="h-full flex flex-col">
      <div className="bg-[#252526] p-2 flex justify-end space-x-2">
        <button
          onClick={() => handleFormatCode(window.monaco.editor.getEditors()[0])}
          className="bg-[#0e639c] hover:bg-[#1177bb] text-white px-2 py-1 rounded text-sm flex items-center"
        >
          <FiCode className="mr-1" /> Format Code
        </button>
        <button
          onClick={onRun}
          className="bg-[#4caf50] hover:bg-[#45a049] text-white px-2 py-1 rounded text-sm flex items-center"
        >
          <FiPlay className="mr-1" /> Run
        </button>
      </div>
      <div className="flex-grow">
        <MonacoEditor
          height="100%"
          language={language}
          value={file.content}
          onChange={(value) => onChange(value || '')}
          theme={theme === 'dark' ? 'myCustomTheme' : 'vs-light'}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            fontFamily: 'Fira Code, monospace',
            formatOnPaste: true,
            formatOnType: true,
            scrollBeyondLastLine: false,
            smoothScrolling: true,
            cursorBlinking: 'smooth',
            cursorSmoothCaretAnimation: 'on',
            renderLineHighlight: 'all',
            autoIndent: 'advanced',
            lineNumbers: 'on',
            lineNumbersMinChars: 3,
            glyphMargin: false,
            folding: true,
            scrollbar: {
              verticalScrollbarSize: 10,
              horizontalScrollbarSize: 10,
            },
          }}
          onMount={handleEditorDidMount}
        />
      </div>
    </div>
  );
};

export default Editor;