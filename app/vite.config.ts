import { defineConfig } from "vite";
import preact from "@preact/preset-vite";

export default defineConfig({
  plugins: [preact()],
  build: {
    manifest: true,
    rollupOptions: {
      input: ["/build.ts"],
      external: ["preact", "preact/jsx-runtime", "@preact/signals"],
    },
  },
});
