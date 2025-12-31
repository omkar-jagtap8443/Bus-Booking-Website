import React from "react"
import Home from "./pages/Home"
import About from "./pages/About"
import { Routes, Route } from "react-router-dom"


function App() {

  return (
  <div>
    <Routes>
      <Route path="/" element={<Home />} />
       <Route path="/About" element={<About />} />
    </Routes>
   
  </div>
  )
}

export default App
