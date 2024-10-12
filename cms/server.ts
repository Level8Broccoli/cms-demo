import { type Route, route } from "@std/http/unstable-route";
import { serveFile } from "@std/http/file-server";

const TMP_DIR = "tmp";
const STATIC_GEN_DIR = "../static-generator/dist";
const APP_GEN_DIR = "../app/dist";

await Deno.mkdir(TMP_DIR, { recursive: true });

const routes: Route[] = [
  {
    pattern: new URLPattern({ pathname: "/" }),
    handler: async (req) => {
      const staticFile = await Deno.readTextFile(
        `${STATIC_GEN_DIR}/static.html`,
      );
      const template = await Deno.readTextFile("./template/base.html");
      const newFile = template.replace("<slot></slot>", staticFile);
      await Deno.writeTextFile(`${TMP_DIR}/index.html`, newFile);
      return serveFile(req, `./${TMP_DIR}/index.html`);
    },
  },
  {
    pattern: new URLPattern({ pathname: "/styles.css" }),
    handler: (req) => serveFile(req, "./template/styles.css"),
  },
  {
    pattern: new URLPattern({ pathname: "/build.js" }),
    handler: async (req) => {
      const manifest = await import(
        `${APP_GEN_DIR}/.vite/manifest.json`,
        { with: { type: "json" } }
      );
      const bundleFileName = manifest.default["build.ts"].file;
      return serveFile(req, `${APP_GEN_DIR}/${bundleFileName}`);
    },
  },
  {
    method: ["GET"],
    pattern: new URLPattern({ pathname: "/data" }),
    handler: async () => {
      const data = await Deno.readTextFile("../app/storage/data.txt");
      return new Response(data);
    },
  },
  {
    method: ["POST"],
    pattern: new URLPattern({ pathname: "/data" }),
    handler: async (req) => {
      const newData = req.body;

      if (newData !== null) {
        await Deno.writeFile("../app/storage/data.txt", newData);
      }
      return new Response("saved", { status: 201 });
    },
  },
];

function defaultHandler(_req: Request) {
  return new Response("Not found", { status: 404 });
}

Deno.serve(route(routes, defaultHandler));
