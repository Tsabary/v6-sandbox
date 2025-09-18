import { Editor } from '@monaco-editor/react';
import type { WebContainer } from '@webcontainer/api';
import React from 'react';
import { VITE_REACT_TEMPLATE } from '../templates/react-vite';
import { getLanguageFromFileName } from '../utils/get-language-from-file-name';
import FileTabs from './file-tabs';
import { FileTree, buildTree } from './file-tree';

export default function CodeEditor({
  webContainer,
}: {
  webContainer: WebContainer | null;
}) {
  const [openedFiles, setOpenedFiles] = React.useState<string[]>([
    VITE_REACT_TEMPLATE.entry,
  ]);
  const [previewFile, setPreviewFile] = React.useState<string | null>(null);
  const [activeFile, setActiveFile] = React.useState<string>(
    VITE_REACT_TEMPLATE.entry,
  );

  // theme (unchanged)...
  const isLight = React.useMemo(() => {
    if (typeof window === 'undefined') return false;
    return new URLSearchParams(window.location.search).get('light') === 'true';
  }, []);
  const monacoTheme = isLight ? 'light' : 'vs-dark';

  const tree = React.useMemo(() => buildTree(VITE_REACT_TEMPLATE.files), []);

  // ---- open logic (preview vs pin) ----
  const openPreview = React.useCallback(
    (file: string) => {
      // If already opened persistently, just activate it
      if (openedFiles.includes(file)) {
        setPreviewFile(null);
        setActiveFile(file);
        return;
      }
      // Otherwise set/replace preview
      setPreviewFile(file);
      setActiveFile(file);
    },
    [openedFiles],
  );

  const openPersistent = React.useCallback((file: string) => {
    setOpenedFiles((prev) => (prev.includes(file) ? prev : [...prev, file]));
    setPreviewFile((prev) => (prev === file ? null : prev)); // clear preview if same
    setActiveFile(file);
  }, []);

  const closeFile = React.useCallback(
    (file: string) => {
      // Closing preview?
      if (previewFile === file) {
        setPreviewFile(null);
        // If it was active, switch to nearest opened tab (or fallback)
        if (activeFile === file) {
          const last =
            openedFiles[openedFiles.length - 1] ?? VITE_REACT_TEMPLATE.entry;
          setActiveFile(last);
        }
        return;
      }
      // Closing persistent tab
      setOpenedFiles((prev) => {
        const idx = prev.indexOf(file);
        if (idx === -1) return prev;
        const next = [...prev.slice(0, idx), ...prev.slice(idx + 1)];
        if (activeFile === file) {
          const neighbor =
            next[idx - 1] ??
            next[idx] ??
            previewFile ??
            VITE_REACT_TEMPLATE.entry;
          setActiveFile(neighbor);
        }
        return next;
      });
    },
    [activeFile, openedFiles, previewFile],
  );

  // Helper function to get file from nested structure
  const getFileFromPath = React.useCallback((path: string) => {
    const parts = path.split('/');
    let current: any = VITE_REACT_TEMPLATE.files;

    for (const part of parts) {
      if (current[part]) {
        current = current[part];
        if ('directory' in current) {
          current = current.directory;
        } else if ('file' in current) {
          return current;
        }
      } else {
        return undefined;
      }
    }
    return current;
  }, []);

  // Get all available file paths for validation
  const getAllFilePaths = React.useCallback(() => {
    const paths: string[] = [];
    const traverse = (node: any, basePath: string = '') => {
      Object.entries(node).forEach(([name, nodeData]: [string, any]) => {
        const currentPath = basePath ? `${basePath}/${name}` : name;
        if ('file' in nodeData) {
          paths.push(currentPath);
        } else if ('directory' in nodeData) {
          traverse(nodeData.directory, currentPath);
        }
      });
    };
    traverse(VITE_REACT_TEMPLATE.files);
    return paths;
  }, []);

  // Guard unknown keys
  React.useEffect(() => {
    const allPaths = getAllFilePaths();
    if (!allPaths.includes(activeFile)) {
      const fallback =
        openedFiles[0] ?? previewFile ?? VITE_REACT_TEMPLATE.entry;
      setActiveFile(fallback);
    }
  }, [activeFile, openedFiles, previewFile, getAllFilePaths]);

  const currentFile = getFileFromPath(activeFile) as
    | { file: { contents: string } }
    | undefined;
  const language = getLanguageFromFileName(activeFile);

  const handleCodeChange = async (content: string) => {
    if (!webContainer) return;
    await webContainer.fs.writeFile(activeFile, content);
  };

  const panelBg = isLight ? 'bg-neutral-50' : 'bg-neutral-900';
  const panelBorder = isLight ? 'border-neutral-200' : 'border-neutral-800';

  return (
    <div className={`flex h-full ${panelBg}`}>
      {/* Sidebar */}
      <aside
        className={`w-56 shrink-0 border-r ${panelBorder} ${panelBg} overflow-auto`}
        aria-label="File explorer"
      >
        <div
          className={`sticky top-0 z-10 border-b ${panelBorder} px-3 py-2 text-xs tracking-wide uppercase ${
            isLight
              ? 'bg-neutral-100 text-neutral-700'
              : 'bg-neutral-950 text-neutral-300'
          }`}
        >
          Files
        </div>
        <FileTree
          nodes={tree}
          activeKey={activeFile}
          onOpen={openPreview} // single-click → preview
          onOpenPermanent={openPersistent} // double-click → pin
          isLight={isLight}
        />
      </aside>

      {/* Editor + tabs */}
      <div className="flex min-w-0 flex-1 flex-col">
        <FileTabs
          activeFile={activeFile}
          openedFiles={openedFiles}
          previewFile={previewFile}
          onActivate={(f) => setActiveFile(f)}
          onClose={closeFile}
          onPersist={openPersistent} // double-click tab → pin
          isLight={isLight}
        />

        <div className="min-h-0 flex-1">
          <Editor
            key={activeFile}
            theme={monacoTheme}
            path={activeFile}
            onChange={(v) => handleCodeChange(v || '')}
            value={currentFile?.file?.contents ?? ''}
            defaultLanguage={language}
            options={{
              fontSize: 14,
              minimap: { enabled: false },
              smoothScrolling: true,
              scrollbar: {
                verticalScrollbarSize: 10,
                horizontalScrollbarSize: 10,
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}
