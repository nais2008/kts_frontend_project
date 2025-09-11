import { Outlet } from 'react-router';

import Footer from './componetns/layout/Footer'
import Header from './componetns/layout/Header/Header'

import './App.scss'

function App() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}

export default App
