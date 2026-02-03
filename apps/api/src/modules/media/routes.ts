import { Hono } from "hono";
import type { Bindings, Variables } from "../../types";

export const mediaModule = new Hono<{ Bindings: Bindings; Variables: Variables }>();
