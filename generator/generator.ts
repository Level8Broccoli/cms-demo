import { renderToString } from "preact-render-to-string";
import { DataInjecter } from "#/generator/DataInjecter.tsx";
import type { AppState } from "#/app/App.tsx";

const data = await Deno.readTextFile("storage/data.txt");
const appState: AppState = {
  text: data,
};

const OUTDIR = "dist/generator";
await Deno.mkdir(OUTDIR, { recursive: true });
await Deno.writeTextFile(
  `${OUTDIR}/static.html`,
  renderToString(DataInjecter(appState)),
);
