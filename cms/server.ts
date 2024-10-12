import { type Route, route } from "@std/http/unstable-route";
import { serveDir, serveFile } from "@std/http/file-server";

const OUTDIR = "dist";
await Deno.mkdir(OUTDIR, { recursive: true });

const routes: Route[] = [
  {
    pattern: new URLPattern({ pathname: "/" }),
    handler: async (req) => {
      const staticFile = await Deno.readTextFile("./gen/index.html");
      const template = await Deno.readTextFile("./template/base.html");
      const newFile = template.replace("<slot></slot>", staticFile);
      await Deno.writeTextFile(`${OUTDIR}/index.html`, newFile);
      return serveFile(req, `./${OUTDIR}/index.html`);
    },
  },
  {
    pattern: new URLPattern({ pathname: "/gen/*" }),
    handler: (req) => serveDir(req),
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
