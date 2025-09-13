import type { RouteObject } from "react-router"

import App from "../App"
import IndexPage from "pages/IndexPage"
import RepositoriesPage from "pages/RepositoriesPage"
import RepositoryPage from "pages/RepositoryPage"


export const routes = {
  main: {
    mask: '/',
    create: () => '/',
  },
  repositories: {
    mask: '/repositories',
    create: () => '/repositories',
  },
  repository: {
    mask: '/repositories/:id',
    create: (id: string) => `/repositories/${id}`
  }
}

export const routesConfig: RouteObject[] = [
  {
    path: routes.main.mask,
    element: <App />,
    children: [
      {
        index: true,
        element: <IndexPage />,
      },
      {
        path: routes.repositories.mask,
        element: <RepositoriesPage />
      },
      {
        path: routes.repository.mask,
        element: <RepositoryPage />
      }
    ]
  },
];
