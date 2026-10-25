import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import patientsHandler from './api/patients.js';

// Serves the Vercel function api/patients.js at /api/patients during
// `npm run dev` and `npm run preview`, so local development matches the
// deployed proxy without needing the Vercel CLI. The server-only
// COALITION_* variables are read from .env.local into the Node process and are
// never exposed to browser code (only VITE_* variables are bundled).
function localApiProxy(serverEnv) {
  const mount = (server) => {
    for (const [key, value] of Object.entries(serverEnv)) {
      process.env[key] ??= value;
    }
    server.middlewares.use('/api/patients', (req, res) => patientsHandler(req, res));
  };

  return {
    name: 'local-api-proxy',
    configureServer: mount,
    configurePreviewServer: mount,
  };
}

export default defineConfig(({ mode }) => ({
  plugins: [react(), localApiProxy(loadEnv(mode, process.cwd(), 'COALITION_'))],
  build: {
    // Keep the built output readable for reviewers.
    minify: false,
  },
}));
