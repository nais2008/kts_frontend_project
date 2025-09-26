import React from "react"

import "config/configureMobX"
import { routesConfig } from "config/routes"
import ReactDOM from "react-dom/client"
import { RouterProvider, createBrowserRouter } from "react-router"

import "./index.scss"

const router = createBrowserRouter(routesConfig)

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLDivElement
)

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
