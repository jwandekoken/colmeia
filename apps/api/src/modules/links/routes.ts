import { Hono } from "hono";
import type { Bindings, Variables } from "../../types";

export const linksModule = new Hono<{ Bindings: Bindings; Variables: Variables }>();
