import type { FileNode } from '@webcontainer/api';
import { appFile } from './app-files/app';

export type Template = {
  files: Record<string, FileNode>;
  entry: string;
  visibleFiles: string[];
};

export const VITE_REACT_TEMPLATE: Template = {
  files: {
    // ── project root
    'index.html': {
      file: {
        contents: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite App</title>
  </head>
  <body>
    <div id="root"></div>
    <!-- Point to src/main.jsx -->
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>`,
      },
    },

    'package.json': {
      file: {
        contents: `{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "3.1.0",
    "vite": "4.1.4",
    "esbuild-wasm": "0.17.12"
  }
}`,
      },
    },

    'vite.config.js': {
      file: {
        contents: `import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
});`,
      },
    },

    // ── src/
    'src/App.jsx': {
      file: { contents: appFile }, // your existing App contents
    },

    'src/main.jsx': {
      file: {
        contents: `import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);`,
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
