import ReactDOM from "react-dom/client"
import { RouterProvider, createBrowserRouter } from "react-router"

import { routesConfig } from "config/routes"
import "config/configureMobX"
import "./index.scss"

const router = createBrowserRouter(routesConfig)

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLDivElement
)

root.render(<RouterProvider router={router} />)
