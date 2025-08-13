import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';


export default defineConfig({
  base: process.env.BASE_URL || '/',

  plugins: [react()],
  base: process.env.GITHUB_ACTIONS ? '/safeDNI/' : '/',
}));
