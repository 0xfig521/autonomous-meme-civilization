import { Hono } from "hono";
import { streamText } from "ai";
import { getModel } from "../ai";
import type { Env } from "../env";

const generate = new Hono<{ Bindings: Env }>();

generate.post("/civilization", async (c) => {
  const env = c.env;
  let body: { prompt?: string };
  try {
    body = await c.req.json<{ prompt?: string }>();
  } catch {
    body = {};
  }

  if (!body.prompt) {
    return c.json({ error: "Missing prompt" }, 400);
  }

  const promptValue = body.prompt;
  const result = streamText({
    model: getModel(env),
    prompt: `Generate a meme civilization based on: ${promptValue}. Return JSON with name, symbol, slogan, lore, personality (traits array), colors (primary, secondary).`,
  });

  return result.toTextStreamResponse();
});

generate.post("/narrative", async (c) => {
  const env = c.env;
  let body: { civId?: string; type?: string };
  try {
    body = await c.req.json();
  } catch {
    body = {};
  }

  if (!body.civId || !body.type) {
    return c.json({ error: "Missing civId or type" }, 400);
  }

  const validTypes = ["propaganda", "event", "war"];
  if (!validTypes.includes(body.type)) {
    return c.json({ error: "Invalid type. Must be: propaganda, event, war" }, 400);
  }

  const result = streamText({
    model: getModel(env),
    prompt: `Generate a ${body.type} narrative for civilization ${body.civId}. Return JSON with narrative text.`,
  });

  return result.toTextStreamResponse();
});

export default generate;
