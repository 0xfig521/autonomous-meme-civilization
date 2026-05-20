import { Hono } from "hono";
import { cors } from "hono/cors";
import { HTTPException } from "hono/http-exception";
import generate from "./routes/generate";
import type { Env } from "./env";

const app = new Hono<{ Bindings: Env }>();

app.onError((err, c) => {
  console.error(err);
  if (err instanceof HTTPException) {
    return c.json({ error: err.message, code: `HTTP_${err.status}` }, err.status);
  }
  return c.json({ error: err.message, code: "INTERNAL_ERROR" }, 500);
});

app.use(
  "*",
  cors({
    origin: "http://localhost:5174",
    allowMethods: ["POST", "OPTIONS"],
    allowHeaders: ["Content-Type"],
  }),
);

app.get("/", (c) => c.json({ status: "ok" }));
app.route("/api/generate", generate);

export default app;
