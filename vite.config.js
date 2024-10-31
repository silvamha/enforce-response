import { defineConfig } from 'vite';

// Vite configuration file
export default defineConfig({
  server: {
    port: 3000, // You can change the port if needed
    open:true,
    proxy: {
      '/api': {
        target: 'http://localhost:1234', // This should be LM Studio's address
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
});
