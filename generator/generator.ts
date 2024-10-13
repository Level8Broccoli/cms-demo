import type { AppState } from "#/app/App.tsx";
import { renderHtmlPage } from "#/generator/Html.tsx";

const data = await Deno.readTextFile("storage/data.txt");
const appState: AppState = {
  text: data,
};

const OUTDIR = "dist/generator";
await Deno.mkdir(OUTDIR, { recursive: true });
await Deno.writeTextFile(`${OUTDIR}/static.html`, renderHtmlPage(appState));
