#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const SOURCE_DIR = 'container-src';
const TARGET_DIR = 'src/templates/app-files';
const REACT_VITE_FILE = 'src/templates/react-vite.ts';

// Utility functions
function toPascalCase(str) {
  return str
    .replace(/[^a-zA-Z0-9]/g, ' ')
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
}

function toValidIdentifier(filePath) {
  const name = filePath.replace(/\//g, '_').replace(/\./g, '_');
  return toPascalCase(name);
}

function escapeTemplateString(content) {
  return content
    .replace(/\\/g, '\\\\')
    .replace(/`/g, '\\`')
    .replace(/\${/g, '\\${');
}

function getAllFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      getAllFiles(filePath, fileList);
    } else {
      fileList.push(filePath);
    }
  });

  return fileList;
}

function createDirectoryStructure(filePath) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function generateFileExports() {
  console.log('🔍 Scanning container-src directory...');

  if (!fs.existsSync(SOURCE_DIR)) {
    console.error(`❌ Source directory "${SOURCE_DIR}" not found!`);
    process.exit(1);
  }

  const files = getAllFiles(SOURCE_DIR);
  console.log(`📁 Found ${files.length} files to convert`);

  const exports = [];

  files.forEach((filePath) => {
    // Read source file
    const content = fs.readFileSync(filePath, 'utf8');

    // Get relative path from source directory
    const relativePath = path.relative(SOURCE_DIR, filePath);

    // Create target TypeScript file path
    const targetPath = path.join(
      TARGET_DIR,
      relativePath.replace(/\.[^/.]+$/, '.ts'),
    );

    // Generate export name
    const exportName = toValidIdentifier(relativePath);

    // Create TypeScript export content
    const tsContent = `export const ${exportName} = \`${escapeTemplateString(content)}\`;
`;

    // Ensure target directory exists
    createDirectoryStructure(targetPath);

    // Write TypeScript file
    fs.writeFileSync(targetPath, tsContent);

    console.log(`✅ Created: ${targetPath}`);

    // Store export info for react-vite.ts generation
    exports.push({
      exportName,
      relativePath,
      importPath: `./${path.relative('src/templates', targetPath).replace(/\\/g, '/')}`,
      originalPath: relativePath,
    });
  });

  return exports;
}

function generateFileSystemTree(exports) {
  const tree = {};

  exports.forEach(({ exportName, originalPath }) => {
    const parts = originalPath.split(path.sep);
    let current = tree;

    // Build nested structure
    for (let i = 0; i < parts.length - 1; i++) {
      const part = parts[i];
      if (!current[part]) {
        current[part] = {
          directory: {},
        };
      }
      current = current[part].directory;
    }

    // Add file
    const fileName = parts[parts.length - 1];
    current[fileName] = {
      file: {
        contents: exportName,
      },
    };
  });

  return tree;
}

function formatFileSystemTree(tree, indent = 4) {
  let result = '';
  const spaces = ' '.repeat(indent);

  Object.keys(tree).forEach((key) => {
    const item = tree[key];

    if (item.directory) {
      result += `${spaces}'${key}': {\n`;
      result += `${spaces}  directory: {\n`;
      result += formatFileSystemTree(item.directory, indent + 4);
      result += `${spaces}  },\n`;
      result += `${spaces}},\n`;
    } else if (item.file) {
      result += `${spaces}'${key}': {\n`;
      result += `${spaces}  file: {\n`;
      result += `${spaces}    contents: ${item.file.contents},\n`;
      result += `${spaces}  },\n`;
      result += `${spaces}},\n`;
    }
  });

  return result;
}

function generateReactViteFile(exports) {
  console.log('🔧 Generating react-vite.ts file...');

  // Read existing template files to get package.json, vite.config, etc.
  const existingImports = [
    "import { packageJson } from './app-files/package-json';",
    "import { viteConfig } from './app-files/vite-config';",
    "import { indexHtml } from './app-files/indexHtml';",
    "import { jsConfigJson } from './app-files/jsConfigJson';",
    "import { componentsJson } from './app-files/componentJson';",
  ];

  // Generate imports for converted files
  const convertedImports = exports
    .map(
      ({ exportName, importPath }) =>
        `import { ${exportName} } from '${importPath}';`,
    )
    .join('\n');

  const allImports = [...existingImports, convertedImports].join('\n');

  // Generate file system tree with proper nesting under src/
  const srcTree = generateFileSystemTree(exports);
  const srcFormatted = formatFileSystemTree(srcTree, 8);

  // Find main entry point
  let entryFile = 'src/app.jsx';
  const appFile = exports.find((e) => e.originalPath === 'app.jsx');
  const mainFile = exports.find((e) => e.originalPath === 'main.jsx');

  if (appFile) {
    entryFile = 'src/app.jsx';
  } else if (mainFile) {
    entryFile = 'src/main.jsx';
  }

  // Generate visible files
  const visibleFiles = [
    'src/app.jsx',
    'src/main.jsx',
    'index.html',
    'package.json',
    'vite.config.js',
  ].filter((file) => {
    const normalizedFile = file.replace('src/', '');
    return (
      exports.some((e) => e.originalPath === normalizedFile) ||
      ['index.html', 'package.json', 'vite.config.js'].includes(file)
    );
  });

  const reactViteContent = `import type { FileSystemTree } from '@webcontainer/api';
${allImports}

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
${srcFormatted}      },
    },
  },

  // Entry point for the application
  entry: '${entryFile}',

  // Files visible in the editor tabs
  visibleFiles: [
${visibleFiles.map((file) => `    '${file}',`).join('\n')}
  ],
};
`;

  return reactViteContent;
}

function main() {
  console.log('🚀 Starting file conversion process...\n');

  try {
    // Step 1: Generate TypeScript export files
    const exports = generateFileExports();

    console.log(`\n✅ Generated ${exports.length} TypeScript export files\n`);

    // Step 2: Generate react-vite.ts
    const reactViteContent = generateReactViteFile(exports);

    // Step 3: Write react-vite.ts
    fs.writeFileSync(REACT_VITE_FILE, reactViteContent);
    console.log(`✅ Updated: ${REACT_VITE_FILE}\n`);

    console.log('🎉 Conversion completed successfully!');
    console.log('\nGenerated files:');
    console.log(
      `  - ${exports.length} TypeScript export files in ${TARGET_DIR}/`,
    );
    console.log(`  - Updated ${REACT_VITE_FILE}`);
  } catch (error) {
    console.error('❌ Error during conversion:', error.message);
    process.exit(1);
  }
}

// Run the script
main();
