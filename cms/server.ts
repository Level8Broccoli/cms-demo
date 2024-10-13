import { type Route, route } from "@std/http/unstable-route";
import { serveFile } from "@std/http/file-server";

const TMP_DIR = "tmp";
const STATIC_GEN_DIR = "dist/generator";
const APP_GEN_DIR = "dist/app";
const CMS_BASE_DIR = "cms";

await Deno.mkdir(TMP_DIR, { recursive: true });

function appendToHead(file: string, element: string): string {
  return file.replace("</head>", element + "</head>");
}

function appendToHtml(file: string, element: string): string {
  return file.replace("</html>", element + "</html>");
}

const routes: Route[] = [
  {
    pattern: new URLPattern({ pathname: "/" }),
    handler: async (req) => {
      const staticFile = await Deno.readTextFile(
        `${STATIC_GEN_DIR}/static.html`,
      );
      const newFile = appendToHtml(
        appendToHead(
          staticFile,
          `<link rel="stylesheet" href="/styles.css">`,
        ),
        `
          <script type="importmap">
            {
              "imports": {
                "preact": "https://esm.sh/preact@^10.24.2",
                "preact/": "https://esm.sh/preact@^10.24.2/",
                "@preact/signals": "https://esm.sh/@preact/signals@^1.3.0"
              }
            }
          </script>
          <script src="/build.js" type="module"></script>
        `,
      );
      await Deno.writeTextFile(`${TMP_DIR}/index.html`, newFile);
      return serveFile(req, `./${TMP_DIR}/index.html`);
    },
  },
  {
    pattern: new URLPattern({ pathname: "/styles.css" }),
    handler: (req) => serveFile(req, `${CMS_BASE_DIR}/template/styles.css`),
  },
  {
    pattern: new URLPattern({ pathname: "/build.js" }),
    handler: async (req) => {
      const manifest = await import(
        `#/${APP_GEN_DIR}/.vite/manifest.json`,
        { with: { type: "json" } }
      );
      const bundleFileName = manifest.default["app/build.ts"].file;
      return serveFile(req, `${APP_GEN_DIR}/${bundleFileName}`);
    },
  },
  {
    method: ["GET"],
    pattern: new URLPattern({ pathname: "/data" }),
    handler: async () => {
      const data = await Deno.readTextFile("storage/data.txt");
      return new Response(data);
    },
  },
  {
    method: ["POST"],
    pattern: new URLPattern({ pathname: "/data" }),
    handler: async (req) => {
      const newData = req.body;

      if (newData !== null) {
        await Deno.writeFile("storage/data.txt", newData);
      }
      return new Response("saved", { status: 201 });
    },
  },
];

function defaultHandler(_req: Request) {
  return new Response("Not found", { status: 404 });
}

Deno.serve(route(routes, defaultHandler));
