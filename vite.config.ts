import { defineConfig } from "vite";
import preact from "@preact/preset-vite";

export default defineConfig({
  plugins: [preact()],
  build: {
    manifest: true,
    rollupOptions: {
      input: ["app/build.ts"],
      output: { dir: "dist/app" },
      external: ["preact", "preact/jsx-runtime", "@preact/signals"],
    },
  },
});
