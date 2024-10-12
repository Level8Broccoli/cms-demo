import { render } from "preact";
import { App } from "./App.tsx";

render(App({ ctx: { static: false } }), document.body);
