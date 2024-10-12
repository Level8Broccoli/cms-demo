import { renderToString } from "preact-render-to-string";
import { App } from "../app/App.tsx";

const data = await Deno.readTextFile("../app/storage/data.txt");

const OUTDIR = "dist";
await Deno.mkdir(OUTDIR, { recursive: true });
await Deno.writeTextFile(
  `${OUTDIR}/static.html`,
  renderToString(App({ state: { textfield: data } })),
);
