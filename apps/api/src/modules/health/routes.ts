import { Hono } from "hono";
import { getHealthStatus } from "./services";
import type { Bindings, Variables } from "../../types";

export const healthModule = new Hono<{ Bindings: Bindings; Variables: Variables }>();

healthModule.get("/", (c) => {
  const status = getHealthStatus();
  return c.json(status, 200);
});
