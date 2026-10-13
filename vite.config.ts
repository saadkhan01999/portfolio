import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  define: {
    // Netlify sets NETLIFY=true during its builds; the contact form then uses
    // Netlify Forms (see src/lib/contact.js).
    __NETLIFY_BUILD__: JSON.stringify(process.env.NETLIFY === 'true'),
  },
  build: {
    target: 'es2020',
    cssCodeSplit: false,
  },
});
