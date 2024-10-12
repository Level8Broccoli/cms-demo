import { Hono } from "@hono/hono";
const app = new Hono();

app.get("/", (c) => c.text("Hono!"));

Deno.serve(app.fetch);
