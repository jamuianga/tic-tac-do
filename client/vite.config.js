import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    build: {
      outDir: process.env.VITE_APP_DIST,
      emptyOutDir: true
    },
    base: process.env.VITE_API_URL,
    plugins: [react()]
  })
};
