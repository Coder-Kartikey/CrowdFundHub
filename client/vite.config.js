import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import basicSSL from '@vitejs/plugin-basic-ssl'; // Import the plugin

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),], // Add the plugin to the plugins array
  server: {
    port: 5173, // Specify the port here
    hmr: {
      overlay: false,
    },
  },
});
