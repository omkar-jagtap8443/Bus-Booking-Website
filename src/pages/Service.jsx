import React from 'react'
import ServiceHero from '../components/Service/ServiceHero'
import ServiceCategories from '../components/Service/ServiceCategories'
import BusFleet from '../components/Service/BusFleet'
import Amenities from '../components/Service/Amenities'
import PopularRoutes from '../components/Service/PopularRoutes'
import BookingProcess from '../components/Service/BookingProcess'


const Service = () => {
  return (
    <div className="min-h-screen bg-white">
      <ServiceHero />
      <ServiceCategories />
      <BusFleet />
      <Amenities />
      <PopularRoutes />
      <BookingProcess />
    
    </div>
  )
}

export default Service