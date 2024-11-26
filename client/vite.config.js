import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import replace from '@rollup/plugin-replace'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    replace({
      'new URL(': 'new globalThis.URL(',
      delimiters: ['', ''],
      preventAssignment: true
    })
  ],
  base: process.env.NODE_ENV === "production" ? "/static/" : "",
  define: {
    "process.env": process.env,
    VITE_BACKEND_URL: process.env.VITE_BACKEND_URL,
  },
  server: {
    proxy: {
      "/tasks/api/v1": {
        target: "http://localhost:8000",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
