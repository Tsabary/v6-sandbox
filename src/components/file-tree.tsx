import React from 'react';
import {
  ChevronRight,
  ChevronDown,
  Folder as LFolder,
  FolderOpen as LFolderOpen,
  File as LFile,
} from 'lucide-react';
import type { FileSystemTree } from '@webcontainer/api';

export type TreeNode = {
  name: string; // segment name (folder or file)
  displayPath: string; // path without leading slash (for rendering nested)
  exactKey: string | null; // original key from filesRecord if this node is a file
  isFile: boolean;
  children?: TreeNode[];
};

/** Build a nested tree from a FileSystemTree structure. */
export function buildTree(fileSystemTree: FileSystemTree): TreeNode[] {
  const buildTreeFromNode = (
    node: FileSystemTree,
    basePath: string = '',
  ): TreeNode[] => {
    return Object.entries(node)
      .map(([name, nodeData]) => {
        const currentPath = basePath ? `${basePath}/${name}` : name;

        if ('file' in nodeData) {
          // This is a file
          return {
            name,
            displayPath: currentPath,
            exactKey: currentPath,
            isFile: true,
            children: undefined,
          };
        } else if ('directory' in nodeData) {
          // This is a directory
          return {
            name,
            displayPath: currentPath,
            exactKey: null,
            isFile: false,
            children: buildTreeFromNode(nodeData.directory, currentPath),
          };
        }

        // Fallback (shouldn't happen with proper FileSystemTree)
        return null;
      })
      .filter((node): node is TreeNode => node !== null)
      .sort((a, b) =>
        a.isFile === b.isFile
          ? a.name.localeCompare(b.name)
          : a.isFile
            ? 1
            : -1,
      );
  };

  return buildTreeFromNode(fileSystemTree);
}

/** Single folder row with controlled open/close state (for reliable icon toggling) */
export function FileTree({
  nodes,
  activeKey,
  onOpen, // single-click (preview)
  onOpenPermanent, // double-click (pin)
  isLight,
}: {
  nodes: TreeNode[];
  activeKey: string;
  onOpen: (exactKey: string) => void;
  onOpenPermanent: (exactKey: string) => void;
  isLight: boolean;
}) {
  return (
    <ul className="px-1 py-1 text-sm">
      {nodes.map((node) =>
        node.isFile ? (
          <FileRow
            key={node.exactKey ?? node.displayPath}
            node={node}
            depth={0}
            activeKey={activeKey}
            onOpen={onOpen}
            onOpenPermanent={onOpenPermanent}
            isLight={isLight}
          />
        ) : (
          <FolderRow
            key={node.displayPath}
            node={node}
            depth={0}
            activeKey={activeKey}
            onOpen={onOpen}
            onOpenPermanent={onOpenPermanent}
            isLight={isLight}
          />
        ),
      )}
    </ul>
  );
}

function FolderRow({
  node,
  depth,
  activeKey,
  onOpen,
  onOpenPermanent,
  isLight,
}: {
  node: TreeNode;
  depth: number;
  activeKey: string;
  onOpen: (k: string) => void;
  onOpenPermanent: (k: string) => void;
  isLight: boolean;
}) {
  const [open, setOpen] = React.useState(true);
  const text = isLight ? 'text-neutral-800' : 'text-neutral-200';
  const hover = isLight ? 'hover:bg-neutral-200' : 'hover:bg-neutral-800';

  return (
    <li className="select-none">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={[
          'flex w-full items-center rounded px-2 py-1.5',
          text,
          hover,
        ].join(' ')}
        style={{ paddingLeft: `${8 + depth * 20}px` }}
        aria-expanded={open}
      >
        {open ? (
          <ChevronDown className="mr-1 h-4 w-4 flex-shrink-0" />
        ) : (
          <ChevronRight className="mr-1 h-4 w-4 flex-shrink-0" />
        )}
        {open ? (
          <LFolderOpen className="mr-2 h-4 w-4 flex-shrink-0" />
        ) : (
          <LFolder className="mr-2 h-4 w-4 flex-shrink-0" />
        )}
        <span className="truncate">{node.name}</span>
      </button>

      {open && node.children?.length ? (
        <ul className="mt-0.5">
          {node.children.map((child) =>
            child.isFile ? (
              <FileRow
                key={child.exactKey ?? child.displayPath}
                node={child}
                depth={depth + 1}
                activeKey={activeKey}
                onOpen={onOpen}
                onOpenPermanent={onOpenPermanent}
                isLight={isLight}
              />
            ) : (
              <FolderRow
                key={child.displayPath}
                node={child}
                depth={depth + 1}
                activeKey={activeKey}
                onOpen={onOpen}
                onOpenPermanent={onOpenPermanent}
                isLight={isLight}
              />
            ),
          )}
        </ul>
      ) : null}
    </li>
  );
}

function FileRow({
  node,
  depth,
  activeKey,
  onOpen,
  onOpenPermanent,
  isLight,
}: {
  node: TreeNode;
  depth: number;
  activeKey: string;
  onOpen: (k: string) => void;
  onOpenPermanent: (k: string) => void;
  isLight: boolean;
}) {
  if (!node.exactKey) return null; // ⬅️ bail out if it's somehow missing

  const text = isLight ? 'text-neutral-800' : 'text-neutral-200';
  const hover = isLight ? 'hover:bg-neutral-200' : 'hover:bg-neutral-800';
  const activeBg = isLight ? 'bg-neutral-300' : 'bg-neutral-700';
  const isActive = activeKey === node.exactKey;

  return (
    <li>
      <button
        type="button"
        onClick={() => onOpen(node.exactKey!)} // ⬅️ non-null now safe
        onDoubleClick={() => onOpenPermanent(node.exactKey!)} // ⬅️ same
        className={[
          'flex w-full items-center rounded px-2 py-1.5',
          text,
          hover,
          isActive ? `${activeBg} font-medium` : '',
        ].join(' ')}
        style={{ paddingLeft: `${8 + depth * 20}px` }}
        title={node.name}
      >
        <LFile className="mr-2 h-4 w-4 flex-shrink-0" />
        <span className="truncate">{node.name}</span>
      </button>
    </li>
  );
}
