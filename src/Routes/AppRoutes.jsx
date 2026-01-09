import React from 'react'
import Home from "../pages/Home"
import About from "../pages/About"
import Contact from "../pages/Contact"
import { Routes, Route } from "react-router-dom"
import Service from '../pages/Service'
import Busdetails from '../pages/Busdetails'

const AppRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/About" element={<About />} />
        <Route path="/s-to-d" element={<Busdetails />}/>
        <Route path="/Contact" element={<Contact />} />
        <Route path="/Service" element={<Service />} />
      </Routes>
    </div>
  )
}

export default AppRoutes