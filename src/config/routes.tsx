import type { RouteObject } from "react-router";
import App from "../App";

export const routes = {
  main: {
    mask: "/",
    create: () => "/mask",
  }
}

export const routesConfig: RouteObject[] = [
  {
    path: routes.main.mask,
    element: <App />,
  }
];
