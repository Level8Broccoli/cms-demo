import { Hono } from "@hono/hono";
import { DynamicApp } from "./DynamicApp.tsx";
const app = new Hono();

app.get("/", (c) => c.html(DynamicApp()));

Deno.serve(app.fetch);
