import { motion } from 'motion/react'
import { useState } from 'react'
import { Routes, Route } from 'react-router'
import Hero1 from './components/hero1'
import Navbar from './components/navbar'
import Welcome from './components/welcome'
import Hero2 from "./components/hero2"
import Project from "./components/project"
import Connect from "./components/connect"
import Footer from "./components/footer"

function App() {
  // const observer = new IntersectionObserver()
  return (
    // <Routes>
    //   <Route path='/welcome' element={<Welcome/>}/>
    // </Routes>，
    <main className='flex flex-col gap-25'>
      <Navbar/>
      <Hero1/>
      <Hero2/>
      <Project/>
      <Connect/>
      <Footer/>
    </main>
  )
}

export default App
