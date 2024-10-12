import { createApp, defineEventHandler, toWebHandler } from "h3";

const app = createApp();

app.use(defineEventHandler(() => "Hello world!"));

// @ts-ignore: ...
Deno.serve(toWebHandler(app));
