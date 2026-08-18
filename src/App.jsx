import { motion } from 'motion/react'
import { useState } from 'react'
import { Routes, Route } from 'react-router'
import Hero1 from './components/hero1'
import Navbar from './components/navbar'
import Welcome from './components/welcome'
import Hero2 from "./components/hero2"

function App() {
  return (
    // <Routes>
    //   <Route path='/welcome' element={<Welcome/>}/>
    // </Routes>，
    <main className='flex flex-col gap-25'>
      <Navbar/>
      <Hero1/>
      <Hero2/>

      <div>
        <h1 className='text-2xl text-red-600'>halo</h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1>Hello Motion!</h1>
          </motion.div>

      </div> 
    </main>
  )
}

export default App
