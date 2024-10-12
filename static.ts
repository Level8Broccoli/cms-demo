import { App } from "./App.tsx";
import { renderToString } from "preact-render-to-string";

await Deno.writeTextFile("out.html", renderToString(App()));
