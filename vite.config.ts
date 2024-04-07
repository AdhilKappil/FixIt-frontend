import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';

dotenv.config();

// Retrieve environment variables
const { BASE_URL } = process.env;

export default defineConfig({
  plugins: [react()],
  server: {
    port: 9000,
    proxy: {
      '/api': {
        target: BASE_URL,
        changeOrigin: true,
      },
    },
  },
});
