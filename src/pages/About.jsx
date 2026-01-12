import React from 'react'
import Legacyoftrust from '../components/About/Legacyoftrust.jsx'
import Herocontain from '../components/About/Herocontain.jsx'
import OurValues from '../components/About/Ourvalues.jsx'
import Foundingteam from '../components/About/Foundingteam.jsx'

const About = () => {
  return (
    <div className='h-full'>
    <Legacyoftrust/>
     <Herocontain/>
     <OurValues/>
      <Foundingteam/>
    </div>
  )
}

export default About