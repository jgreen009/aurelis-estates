import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true,
  },
  build: {
    target: 'es2020',
    sourcemap: false,
    chunkSizeWarningLimit: 1200,
    rollupOptions: {
      output: {
        manualChunks: {
          'motion': ['framer-motion'],
          'gsap': ['gsap'],
          'three': ['three'],
          'mapbox': ['mapbox-gl'],
          'forms': ['react-hook-form', 'zod'],
        },
      },
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './tests/setup.js',
    css: false,
    include: ['tests/unit/**/*.{test,spec}.{js,jsx}'],
    coverage: {
      reporter: ['text', 'html'],
      include: ['src/utils/**', 'src/data/**'],
    },
  },
});
