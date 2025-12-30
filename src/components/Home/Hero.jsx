import React from 'react'
import WhyChooseUs from './WhyChooseUs'
import OurDetails from './OurDetails'
import Aboutbuscompany from './Aboutbuscompany'
import ImageCard from './ImageCard'
import OurBrands from './OurBrands'
import Awards from './Awards'
import Testimonalies from './Testimonalies'




const Hero = (props) => {
  return (

     <>

<div className="w-full flex flex-col items-center justify-center text-center px-4">

  <h1 className="
    text-orange-400 
    font-serif 
    text-2xl md:text-3xl lg:text-5xl 
    py-6
    animate-fade-up
  ">
    The Raj Mudra Travelers
  </h1>


  <p className="
    text-black/60 
    font-serif 
    text-sm md:text-lg lg:text-2xl 
    max-w-5xl
    leading-relaxed
    animate-fade-up delay-200
  ">
    The Raj Mudra Travelers is your trusted travel partner, offering safe,
    comfortable, and affordable journeys across cities and destinations.
    With well-maintained vehicles, experienced drivers, and 24/7 service,
    we ensure every trip is smooth, memorable, and stress-free.
    Your comfort, safety, and satisfaction are always our top priority.
  </p>

</div >



    
    <WhyChooseUs/>

    <OurDetails/>

       <ImageCard/>

       <Aboutbuscompany/>

       
       <OurBrands/>

       <Awards/>

      < Testimonalies/>

   

  







  
    
    </>
  )
}

export default Hero