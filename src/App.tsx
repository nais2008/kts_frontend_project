import { TokenProvider } from "providers/TokenProvider"
import { Outlet } from "react-router"

import Layout from "components/layout/Layout"

function App() {
  return (
    <TokenProvider>
      <Layout>
        <Outlet />
      </Layout>
    </TokenProvider>
  )
}

export default App
