import { defineConfig } from 'vite'

// Base-aware for GitHub Pages (/PhiField/) and Netlify custom domain (/).
// Override only in the deploy workflow. Never bake production domain into assets.
export default defineConfig({
  base: process.env.PHI_FIELD_BASE || '/',
  build: { outDir: 'dist', assetsDir: 'assets', sourcemap: false },
})
