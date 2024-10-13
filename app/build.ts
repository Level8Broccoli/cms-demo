import { render } from "preact";
import type { AppState } from "#/app/App.tsx";
import { Cms } from "#/app/Cms.tsx";

async function main(): Promise<void> {
  const data = await (await fetch("/data")).text();
  const initAppState: AppState = {
    text: data,
  };

  render(
    Cms(initAppState),
    document.body,
  );
}

main().catch(console.error);
