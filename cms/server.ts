import { type Route, route } from "@std/http/unstable-route";
import { serveDir } from "@std/http/file-server";

const routes: Route[] = [
  {
    pattern: new URLPattern({ pathname: "/" }),
    handler: (req) => serveDir(req, { fsRoot: "static" }),
  },
  {
    pattern: new URLPattern({ pathname: "/gen/*" }),
    handler: (req) => serveDir(req),
  },
];

function defaultHandler(_req: Request) {
  return new Response("Not found", { status: 404 });
}

Deno.serve(route(routes, defaultHandler));
