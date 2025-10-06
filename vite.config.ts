import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import tsconfigPaths from 'vite-tsconfig-paths';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    dts({
      insertTypesEntry: true,
      outDir: 'dist/types', // types directement dans dist/types
    }),
  ],
  build: {
    outDir: 'dist', // 🟢 Build direct dans dist/
    emptyOutDir: true,
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'Tongasoa',
      fileName: (format) => `index.${format}.js`,
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
        assetFileNames: (assetInfo) => {
          if (
            Array.isArray(assetInfo.names) &&
            assetInfo.names.some((n) => n.endsWith('.css'))
          ) {
            return 'index.css';
          }
          return '[name][extname]';
        },
      },
    },
  },
  resolve: {
    alias: {
      '@/': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5173,
    open: true,
  },
});
