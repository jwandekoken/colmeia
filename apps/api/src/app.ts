import { Hono } from "hono";
import { createContainer } from "./container";
import { captainsModule } from "./modules/captains/routes";
import { healthModule } from "./modules/health/routes";
import { linksModule } from "./modules/links/routes";
import { mediaModule } from "./modules/media/routes";
import { missionsModule } from "./modules/missions/routes";
import { rankingModule } from "./modules/ranking/routes";
import type { Bindings, Variables } from "./types";

const app = new Hono<{ Bindings: Bindings; Variables: Variables }>();

app.use("*", async (c, next) => {
  const deps = createContainer(c);
  c.set("deps", deps);
  await next();
});

app.route("/health", healthModule);
app.route("/missions", missionsModule);
app.route("/captains", captainsModule);
app.route("/links", linksModule);
app.route("/ranking", rankingModule);
app.route("/media", mediaModule);

export type AppType = typeof app;
export default app;
