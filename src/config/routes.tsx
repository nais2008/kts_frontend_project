import IndexPage from "pages/IndexPage"
import RepositoriesPage from "pages/RepositoriesPage"
import RepositoryPage from "pages/RepositoryPage"
import type { RouteObject } from "react-router"

import App from "../App"

export const ROUTES = {
  main: {
    mask: "/",
    create: () => "/",
  },
  repositories: {
    mask: "/repositories",
    create: () => "/repositories",
  },
  repository: {
    mask: "/repositories/:name",
    create: (name: string) => `/repositories/${name}`,
  },
}

export const routesConfig: RouteObject[] = [
  {
    path: ROUTES.main.mask,
    element: <App />,
    children: [
      {
        index: true,
        element: <IndexPage />,
      },
      {
        path: ROUTES.repositories.mask,
        element: <RepositoriesPage />,
      },
      {
        path: ROUTES.repository.mask,
        element: <RepositoryPage />,
      },
    ],
  },
]
