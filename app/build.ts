import { render } from "preact";
import { App } from "./App.tsx";

async function main(): Promise<void> {
  let data = await (await fetch("/data")).text();

  function updateTextfield(newValue: string): void {
    console.log("before", { data, newValue });
    data = newValue;
    console.log("after", { data, newValue });
  }

  async function save(): Promise<void> {
    await fetch("/data", { method: "post", body: data });
  }

  render(
    App({
      ctx: { static: false, updateTextfield, save },
      state: { textfield: data },
    }),
    document.body,
  );
}

main().catch(console.error);
