import { pluginDeno } from "@deno-plc/vite-plugin-deno";
import prefresh from "@prefresh/vite"; // HMR
import type { InlineConfig, Plugin } from "vite";

export const config: InlineConfig = {
  configFile: false, // configuration is inlined here
  server: {
    port: 80,
  },
  plugins: [
    pluginDeno({
      env: "browser",
      undeclared_npm_imports: [
        // injected by JSX transform
        "preact/jsx-runtime",
        "preact/jsx-dev-runtime",
        // injected by HMR
        "@prefresh/core",
        "@prefresh/utils",
      ],
    }),
    // HMR Plugin
    prefresh({
      // `node_modules` is excluded internally, lets do the same
      exclude: [/^npm/, /registry.npmjs.org/, /^jsr/, /^https?/],
    }) as Plugin,
  ],
  // JSX transform
  esbuild: {
    jsx: "automatic",
    jsxImportSource: "preact",
  },
  build: {
    manifest: true,
    rollupOptions: {
      input: ["app/entrypoint.ts"],
      output: { dir: "dist/app" },
    },
  },
};
