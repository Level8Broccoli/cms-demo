import type { ComponentChildren, JSX } from "preact";
import { renderToString } from "preact-render-to-string";
import type { AppState } from "#/app/App.tsx";
import { DataInjecter } from "#/generator/DataInjecter.tsx";

export function renderHtmlPage(appState: AppState): string {
  const doctype = "<!DOCTYPE html>";
  return doctype + renderToString(
    <Html>
      <DataInjecter appState={appState} />
    </Html>,
  );
}

function Html(props: { children: ComponentChildren }): JSX.Element {
  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        {props.children}
      </body>
    </html>
  );
}
