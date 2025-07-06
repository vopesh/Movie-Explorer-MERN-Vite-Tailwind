// client/vite.config.js
import { defineConfig, loadEnv } from "vite";
import path from "node:path";
import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react-swc";
//import process from "node:process";

export default defineConfig(({ mode }) => {
  //const env = loadEnv(mode, process.cwd(), "");
  const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
  const env = loadEnv(mode, root, "");

  return {
    server: {
      port: Number(env.DEV_PORT) || 5173,
      proxy: {
        "/api": `http://localhost:${env.PORT || 5000}`,
      },
    },
    preview: {
      port: Number(env.PREVIEW_PORT) || 4173,
    },
    plugins: [react()], // ← only React/SWC for now
  };
});
