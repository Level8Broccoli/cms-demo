import { render } from "preact";
import { App } from "./App.tsx";

async function main(): Promise<void> {
  const data = await (await fetch("/data")).text();

  render(
    App({ ctx: { static: false }, state: { textfield: data } }),
    document.body,
  );
}

main().catch(console.error);
