import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { copyFileSync, readdirSync, writeFileSync } from 'fs';
import { join } from 'path';

const root = __dirname;
const srcRoot = join(__dirname, 'src');
const assetsRoot = join(__dirname, 'src', 'assets');
const outDir = join(root, 'dist');

export default defineConfig(({ command }) => ({
  root,
  base: command === 'build' ? '/ProjecKan-Manager/' : '/',
  plugins: [
    react(),
    {
      name: 'github-pages-spa-fallback',
      apply: 'build',
      closeBundle() {
        copyFileSync(join(outDir, 'index.html'), join(outDir, '404.html'));
        const collectFiles = (directory: string, prefix = ''): string[] =>
          readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
            const relativePath = prefix ? `${prefix}/${entry.name}` : entry.name;
            return entry.isDirectory()
              ? collectFiles(join(directory, entry.name), relativePath)
              : [relativePath.replace(/\\/g, '/')];
          });
        const precacheFiles = collectFiles(outDir).filter((file) => file !== 'precache-manifest.json');
        writeFileSync(join(outDir, 'precache-manifest.json'), JSON.stringify(precacheFiles));
      }
    }
  ],
  resolve: {
    alias: {
      '@': srcRoot,
      '/@': srcRoot,
      '@assets': assetsRoot
    }
  },
  build: {
    outDir,
    emptyOutDir: true,
    rollupOptions: { external: [''] }
  },
  server: {
    port: 3000
  }
}));
