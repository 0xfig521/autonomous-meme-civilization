import { createOpenAICompatible } from "@ai-sdk/openai-compatible";
import type { Env } from "./env";

export const createDeepseek = (env: Env) => {
  return createOpenAICompatible({
    name: "deepseek",
    baseURL: env.DEEPSEEK_BASE_URL || "https://api.deepseek.com",
    apiKey: env.DEEPSEEK_API_KEY,
  });
};

export const getModel = (env: Env) => {
  return createDeepseek(env).languageModel(env.DEEPSEEK_MODEL);
};
