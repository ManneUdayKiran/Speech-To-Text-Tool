import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: parseInt(process.env.PORT) || 5173,
    allowedHosts: ['https://speech-to-text-tool.onrender.com','https://speech-to-text-tool-backend.onrender.com']

  }
});
