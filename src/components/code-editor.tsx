import { Editor } from '@monaco-editor/react';
import React from 'react';
import { VITE_REACT_TEMPLATE } from '../templates/react-vite';
import { getLanguageFromFileName } from '../utils/get-language-from-file-name';
import FileTabs from './file-tabs';

export default function CodeEditor() {
  const [activeFile, setActiveFile] = React.useState(
    () => VITE_REACT_TEMPLATE.entry,
  );

  const currentFile = VITE_REACT_TEMPLATE.files[activeFile];
  const language = getLanguageFromFileName(activeFile);

  return (
    <div className="h-full">
      <FileTabs
        files={VITE_REACT_TEMPLATE.visibleFiles}
        activeFile={activeFile}
        onFileChange={setActiveFile}
      />
      <Editor
        theme="vs-dark"
        path={activeFile}
        defaultValue={currentFile.file.contents as string} // Ideally, worry about the encoding in production, for our example, this is fine.
        defaultLanguage={language}
      />
    </div>
  );
}
