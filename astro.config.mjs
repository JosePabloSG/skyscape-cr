// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  site: 'https://skyscape-cr.com', // Your production URL
  vite: {
    plugins: [tailwindcss()],
    build: {
      // Optimize assets for better performance
      assetsInlineLimit: 4096,
      cssCodeSplit: false,
      rollupOptions: {
        output: {
          // Optimize chunk splitting
          manualChunks: {
            vendor: ['lucide-static']
          }
        }
      }
    },
    // Optimize images
    assetsInclude: ['**/*.svg', '**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.webp']
  },
  build: {
    // Optimize HTML output
    inlineStylesheets: 'auto',
    assets: '_astro'
  },
  compressHTML: true,
  // Add redirects for better SEO
  redirects: {
    '/home': '/',
    '/inicio': '/'
  }
});