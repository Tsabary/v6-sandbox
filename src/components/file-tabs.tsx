import { X } from 'lucide-react';
import { cn } from '../utils/classnames';

type FileTabsProps = {
  activeFile: string;
  openedFiles: string[]; // persistent tabs
  previewFile?: string | null; // at most one preview tab
  onActivate: (fileName: string) => void;
  onClose: (fileName: string) => void;
  onPersist: (fileName: string) => void; // double-click pin
  isLight?: boolean;
};

export default function FileTabs({
  activeFile,
  openedFiles,
  previewFile,
  onActivate,
  onClose,
  onPersist,
  isLight = false,
}: FileTabsProps) {
  const bg = isLight ? 'bg-neutral-100' : 'bg-gray-900';
  const border = isLight ? 'border-neutral-200' : 'border-gray-800';
  const idle = isLight
    ? 'text-neutral-700 hover:bg-neutral-200'
    : 'text-gray-300 hover:bg-gray-800';
  const active = isLight
    ? 'bg-white text-neutral-900'
    : 'bg-gray-950 text-white';
  const closeIdle = isLight ? 'hover:bg-neutral-300' : 'hover:bg-gray-700';

  const renderTab = (file: string, { preview }: { preview: boolean }) => {
    const isActive = file === activeFile;
    return (
      <li key={`${preview ? 'preview:' : ''}${file}`} className="flex">
        <button
          type="button"
          className={cn(
            'group flex items-center gap-2 rounded-t px-3 py-1.5 text-sm transition-colors',
            isActive ? active : idle,
            preview && 'italic opacity-90',
          )}
          onClick={() => onActivate(file)}
          onDoubleClick={() => onPersist(file)} // pin on double-click
          onMouseDown={(e) => {
            if (e.button === 1) {
              e.preventDefault();
              onClose(file);
            }
          }}
          title={preview ? `${file} (Preview)` : file}
        >
          <span className="max-w-[16ch] truncate">{file.split('/').pop()}</span>
          <span
            role="button"
            aria-label={`Close ${file}`}
            onClick={(e) => {
              e.stopPropagation();
              onClose(file);
            }}
            className={cn(
              'rounded p-0.5 opacity-70 transition-opacity',
              closeIdle,
              isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100',
            )}
          >
            <X className="h-3.5 w-3.5" />
          </span>
        </button>
      </li>
    );
  };

  return (
    <div
      className={cn('flex items-center overflow-x-auto border-b', border, bg)}
    >
      <ul className="flex min-h-9 items-center gap-1 px-2 py-1">
        {openedFiles.map((f) => renderTab(f, { preview: false }))}
        {previewFile &&
          !openedFiles.includes(previewFile) &&
          renderTab(previewFile, { preview: true })}
      </ul>
    </div>
  );
}
