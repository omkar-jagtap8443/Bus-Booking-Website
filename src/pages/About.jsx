import React from 'react'
import Header from '../components/Layout/Header.jsx'
import Footer from '../components/Layout/Footer.jsx'
import Legacyoftrust from '../components/About/Legacyoftrust.jsx'

import Herocontain from '../components/About/Herocontain.jsx'
import Foundingteam from '../components/About/Foundingteam.jsx'

const About = () => {
  return (
    <div className='h-full'>
    <Legacyoftrust/>
     <Herocontain/>
      <Foundingteam/>
    </div>
  )
}

export default About