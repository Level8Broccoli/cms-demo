import type { JSX } from "preact/jsx-runtime";
import { signal } from "@preact/signals";
import { App, type AppState } from "./App.tsx";

export function Cms(initState: AppState): JSX.Element {
  const appState = signal<AppState>(initState);

  async function save(): Promise<void> {
    await fetch("/data", { method: "post", body: appState.value.text });
  }

  return <App state={appState} ctx={{ static: false, save }} />;
}
