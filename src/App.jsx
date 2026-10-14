import { Routes, Route, useLocation } from 'react-router'
import Hero1 from './components/hero1'
import Navbar from './components/navbar'
import Hero2 from './components/hero2'
import Project from './components/project'
import Connect from './components/connect'
import Footer from './components/footer'
import Project_detail from './components/project_detail'

function App() {
  const { pathname } = useLocation()
  const isDetail = pathname === '/project-detail'

  return (
    <main className={`flex flex-col ${isDetail ? '' : 'gap-25'}`}>
      {!isDetail && <Navbar/>}
      <Routes>
        <Route path='/' element={
          <>
            <Hero1/>
            <Hero2/>
            <Project/>
            <Connect/>
          </>
        }/>
        <Route path='/project-detail' element={<Project_detail/>}/>
      </Routes>
      <Footer/>
    </main>
  )
}

export default App