import { Outlet } from 'react-router'

import Layout from 'components/layout/Layout'

import './App.scss'

function App() {
  return (
    <>
      <Layout>
        <Outlet />
      </Layout>
    </>
  )
}

export default App
