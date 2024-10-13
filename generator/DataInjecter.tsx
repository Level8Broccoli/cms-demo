import type { JSX } from "preact";
import { signal } from "@preact/signals";
import { App, type AppState } from "../app/App.tsx";

export function DataInjecter(appState: AppState): JSX.Element {
  const appStateSignal = signal<AppState>(appState);
  return <App state={appStateSignal} />;
}
