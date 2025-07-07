import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/',
    server: {
    host: true,        // Accept connections from LAN
    port: 5173,        // Optional: you can set specific port
  }
});
