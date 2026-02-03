import { Hono } from "hono";
import type { Bindings, Variables } from "../../types";

export const missionsModule = new Hono<{ Bindings: Bindings; Variables: Variables }>();
