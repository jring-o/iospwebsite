import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  // 1. Tell Vite to work inside your new source folder
  root: 'narrative-src',
  
  // 2. This ensures assets are loaded correctly (e.g. /narrative/js/main.js) 
  // when Next.js serves them in production
  base: '/narrative/', 
  
  build: {
    // 3. Output the compiled files back into Next.js's public folder
    outDir: resolve(__dirname, 'public/narrative'),
    
    // 4. Clear the old build before creating a new one
    emptyOutDir: true,
    
    rollupOptions: {
      input: {
        // The entry point for the build
        main: resolve(__dirname, 'narrative-src/index.html'),
      },
    },
  },
  // 5. Allow Vite to pick up the Tailwind config from the root
  css: {
    postcss: './postcss.config.mjs',
  }
});