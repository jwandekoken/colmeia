import { Hono } from "hono";
import type { Bindings, Variables } from "../../types";

export const captainsModule = new Hono<{ Bindings: Bindings; Variables: Variables }>();
