import { defineConfig } from 'vite';
import { resolve } from 'path';
import { readdirSync } from 'fs';

const pagesDir = './';

// Generate input entries for Rollup based on HTML files in the pages directory
const input = readdirSync(pagesDir)
  .filter((file) => file.endsWith('.html')) // Only include .html files
  .reduce((entries, file) => {
    const name = file.replace('.html', '');
    entries[name] = resolve(__dirname, `${pagesDir}/${file}`);
    return entries;
  }, {});

export default defineConfig({
  build: {
    rollupOptions: {
      input,
    },
  },
});
