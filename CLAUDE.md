# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React-based web IDE that creates an in-browser development environment using WebContainer API. It provides a Monaco editor, terminal, and live preview in a split-panel layout similar to CodeSandbox or StackBlitz.

## Development Commands

- `pnpm dev` - Start development server with hot reload
- `pnpm build` - Build for production (runs TypeScript check then Vite build)
- `pnpm lint` - Run ESLint
- `pnpm preview` - Preview production build locally

## Architecture

### Core Technologies

- **WebContainer API** (`@webcontainer/api`) - Runs Node.js environment in browser
- **Monaco Editor** (`@monaco-editor/react`) - Code editor component
- **XTerm.js** (`@xterm/xterm`) - Terminal emulator
- **React Resizable Panels** - Split panel layout
- **Tailwind CSS v4** - Styling with `@tailwindcss/vite` plugin

### Key Components

**App.tsx** (src/App.tsx:1-53)

- Main application shell with resizable panel layout
- Initializes WebContainer instance and mounts template files
- Note: WebContainer teardown is currently disabled due to upstream issue

**CodeEditor** (src/components/code-editor.tsx)

- Monaco editor with file tab interface
- Writes changes directly to WebContainer filesystem
- Language detection based on file extension

**Terminal** (src/components/terminal.tsx)

- XTerm.js terminal with fit addon for responsive sizing
- Spawns 'jsh' shell process in WebContainer
- Bidirectional data flow between terminal and shell process

**Preview** (src/components/preview.tsx)

- iframe that displays the running application
- Listens for 'server-ready' event from WebContainer to set iframe src

### Template System

Templates are defined in `src/templates/` and contain:

- `files`: WebContainer file structure with file contents
- `entry`: Primary file to display in editor
- `visibleFiles`: Files shown in tab interface

Current template (`VITE_REACT_TEMPLATE`) creates a basic Vite + React setup.

### Important Configuration

**Vite Config** - Includes COOP/COEP headers required for WebContainer:

```typescript
server: {
  headers: {
    'Cross-Origin-Embedder-Policy': 'require-corp',
    'Cross-Origin-Opener-Policy': 'same-origin',
  },
}
```

## Development Notes

- Uses `pnpm` as package manager (version pinned in package.json)
- Husky + lint-staged configured for pre-commit hooks
- TypeScript with strict mode and project references
- No existing CLAUDE.md, Cursor rules, or GitHub Copilot instructions found
