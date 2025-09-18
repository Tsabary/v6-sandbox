import type { FileSystemTree } from '@webcontainer/api';
import { appFile } from './app-files/src/app';
import { packageJson } from './app-files/package-json';
import { viteConfig } from './app-files/vite-config';
import { indexHtml } from './app-files/indexHtml';
import { main } from './app-files/src/main';
import { jsConfigJson } from './app-files/jsConfigJson';
import { componentsJson } from './app-files/componentJson';

export type Template = {
  files: FileSystemTree;
  entry: string;
  visibleFiles: string[];
};

export const VITE_REACT_TEMPLATE: Template = {
  files: {
    // ── project root
    'index.html': {
      file: {
        contents: indexHtml,
      },
    },

    'package.json': {
      file: {
        contents: packageJson,
      },
    },

    'vite.config.js': {
      file: {
        contents: viteConfig,
      },
    },
    'jsconfig.json': {
      file: { contents: jsConfigJson },
    },
    'components.json': {
      file: { contents: componentsJson },
    },

    // ── src/
    src: {
      directory: {
        'App.jsx': {
          file: { contents: appFile },
        },
        'main.jsx': {
          file: {
            contents: main,
          },
        },
      },
    },
  },

  // Optional: whatever your app uses as the "entry" reference
  entry: 'src/App.jsx',

  // Controls what your tabs/file-tree show
  visibleFiles: [
    'src/App.jsx',
    'src/main.jsx',
    'index.html',
    'vite.config.js',
    'package.json',
  ],
};
