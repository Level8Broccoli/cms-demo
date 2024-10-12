import { App } from "./App.tsx";
import { renderToString } from "preact-render-to-string";

await Deno.mkdir("out");
await Deno.writeTextFile("out/static.html", renderToString(App()));
