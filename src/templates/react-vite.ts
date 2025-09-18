import type { FileSystemTree } from '@webcontainer/api';
import { appFile } from './app-files/src/app';
import { packageJson } from './app-files/package-json';
import { viteConfig } from './app-files/vite-config';
import { indexHtml } from './app-files/indexHtml';
import { main } from './app-files/src/main';
import { jsConfigJson } from './app-files/jsConfigJson';
import { componentsJson } from './app-files/componentJson';
import { tweet } from './app-files/src/components/tweet';

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
        'app.jsx': {
          file: { contents: appFile },
        },
        'main.jsx': {
          file: {
            contents: main,
          },
        },
        components: {
          directory: {
            'tweet.jsx': {
              file: {
                contents: tweet,
              },
            },
          },
        },
      },
    },
  },

  // Optional: whatever your app uses as the "entry" reference
  entry: 'src/app.jsx',

  // Controls what your tabs/file-tree show
  visibleFiles: [
    'src/app.jsx',
    'src/main.jsx',
    'index.html',
    'vite.config.js',
    'package.json',
  ],
};
