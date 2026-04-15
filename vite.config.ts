import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const clearDebtClient = path.resolve(__dirname, '../ClearDebt/client')
const clearDebtSrc = path.join(clearDebtClient, 'src')

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    fs: {
      // Allow importing from sibling ClearDebt app (outside default Vite root).
      allow: [__dirname, clearDebtClient],
    },
  },
  resolve: {
    // Match `@/…` explicitly so `@/lib/api` always maps under ClearDebt `src/`
    // (a bare `@` key can fail to resolve in some Vite / tooling setups).
    alias: [{ find: /^@\//, replacement: `${clearDebtSrc}/` }],
  },
  define: {
    'import.meta.env.VITE_APP_BASE_PATH': JSON.stringify('/dashboard'),
  },
})
