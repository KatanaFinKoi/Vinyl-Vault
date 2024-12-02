import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "0.0.0.0",
    port: parseInt(process.env.PORT || '3000'),
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false,
      },
      '/auth': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false
      },
      '/users': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false
      },
      '/discogs': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false
      },
      '/api/deezer': {
        target: 'https://api.deezer.com', // Deezer's API
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/api\/deezer/, '') // Remove `/api/deezer` prefix in the actual request
    }
  }
  },
});
