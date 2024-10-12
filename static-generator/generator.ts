import { renderToString } from "preact-render-to-string";
import { App } from "../app/App.tsx";

await Deno.mkdir("out", { recursive: true });
await Deno.writeTextFile("out/static.html", renderToString(App()));
