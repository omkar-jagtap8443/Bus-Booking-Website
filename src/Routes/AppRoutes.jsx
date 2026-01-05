import React from 'react'
import Home from "../pages/Home"
import About from "../pages/About"
import Contact from "../pages/Contact"
import { Routes, Route } from "react-router-dom"

const AppRoutes = () => {
  return (
    <div>
      <Routes>
      <Route path="/" element={<Home />} />
       <Route path="/About" element={<About />} />
         <Route path="/Contact" element={<Contact />} />
    </Routes>
    </div>
  )
}

export default AppRoutes