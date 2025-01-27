import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";

dotenv.config();

const isDevelopment = process.env.VITE_NODE_ENV === "development";

const localhost = process.env.VITE_LOCALHOST;
const onRender = process.env.VITE_ON_RENDER;

const target = isDevelopment ? localhost : onRender;

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: target,
      },
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./tests/setup.ts",
  },
});
