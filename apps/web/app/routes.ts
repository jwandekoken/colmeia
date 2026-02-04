import { type RouteConfig, index, layout, prefix, route } from "@react-router/dev/routes";

export default [
  index("./routes/_index.tsx"),
  ...prefix("app", [
    layout("./routes/app.layout.tsx", [
      route("general", "./routes/app.general.tsx"),
      route("captain", "./routes/app.captain.tsx"),
    ]),
  ]),
  route("forms/:slug", "./routes/forms.$slug.tsx"),
] satisfies RouteConfig;
