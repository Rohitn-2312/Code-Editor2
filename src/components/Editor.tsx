import React from 'react';
import MonacoEditor from '@monaco-editor/react';
import { File } from '../types';

interface EditorProps {
  file: File | null;
  onChange: (content: string) => void;
  theme: 'light' | 'dark';
  language: string;
}

const Editor: React.FC<EditorProps> = ({ file, onChange, theme, language }) => {
  if (!file) return null;

  const handleEditorDidMount = (_editor: any, monaco: any) => {
    monaco.editor.defineTheme('myCustomTheme', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: 'comment', foreground: 'ffa500', fontStyle: 'italic underline' },
        { token: 'comment.js', foreground: '008800', fontStyle: 'bold' },
        { token: 'comment.css', foreground: '0000ff' }
      ],
      colors: {
        'editor.foreground': '#000000',
        'editor.background': '#EDF9FA',
        'editorCursor.foreground': '#8B0000',
        'editor.lineHighlightBackground': '#0000FF20',
        'editorLineNumber.foreground': '#008800',
        'editor.selectionBackground': '#88000030',
        'editor.inactiveSelectionBackground': '#88000015'
      }
    });
    monaco.editor.setTheme('myCustomTheme');
  };

  return (
    <div className="flex-1 overflow-hidden">
      <MonacoEditor
        height="100%"
        language={language}
        value={file.content}
        onChange={(value) => onChange(value || '')}
        theme={theme === 'dark' ? 'vs-dark' : 'light'}
        options={{
            minimap: { enabled: false },
            fontSize: 14,
            formatOnPaste: true,
            formatOnType: true,
            scrollBeyondLastLine: false,
            smoothScrolling: true,
            cursorBlinking: 'smooth',
            cursorSmoothCaretAnimation: 'on',
            renderLineHighlight: 'all',
            autoIndent: 'advanced',
          }}
        onMount={handleEditorDidMount}
      />
    </div>
  );
};

export default Editor;