import { Hono } from "hono";
import type { Bindings, Variables } from "../../types";

export const rankingModule = new Hono<{ Bindings: Bindings; Variables: Variables }>();
