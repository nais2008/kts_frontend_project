import { Outlet } from 'react-router'

import Layout from 'components/layout/Layout'

import './App.scss'
import { TokenProvider } from 'providers/TokenProvider'

function App() {
  return (
    <>
      <TokenProvider>
        <Layout>
          <Outlet />
        </Layout>
      </TokenProvider>
    </>
  )
}

export default App
