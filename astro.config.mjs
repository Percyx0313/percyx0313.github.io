// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";

import react from "@astrojs/react";
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  // GitHub Pages 設定 - username.github.io 不需要 base path
  site: 'https://percyx0313.github.io',
  
  // 靜態檔案輸出，適用於 GitHub Pages
  output: 'static',
  
  vite: {
      plugins: [tailwindcss()],
  },

  integrations: [react(), mdx()]
});