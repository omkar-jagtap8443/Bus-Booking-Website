import React from 'react'


import { FaLongArrowAltRight } from "react-icons/fa";

const WhyChooseUs = () => {
      const cards = [
    {
      title: "Bus 1",
      img: "https://i.pinimg.com/1200x/be/d9/5f/bed95f67a0643a9dcd08b39554c52f0e.jpg",
      desc: "Experience unparalleled comfort and safety with our top-notch bus services, designed to make your journey memorable."
    },
    {
      title: "Bus 2",
      img: "https://i.pinimg.com/1200x/cf/05/65/cf056508031860e97638bf0ff5f2d7f6.jpg",
       desc: "Experience unparalleled comfort and safety with our top-notch bus services, designed to make your journey memorable."
    },
    {
      title: "Bus 3",
      img: "https://i.pinimg.com/1200x/be/d9/5f/bed95f67a0643a9dcd08b39554c52f0e.jpg",
       desc: "Experience unparalleled comfort and safety with our top-notch bus services, designed to make your journey memorable."
    },
    {
      title: "Bus 4",
      img: "https://i.pinimg.com/1200x/be/d9/5f/bed95f67a0643a9dcd08b39554c52f0e.jpg",
       desc: "Experience unparalleled comfort and safety with our top-notch bus services, designed to make your journey memorable."
       
    },
  ];

  return (
    <div className="bg-white/90 mt-6 mx-4 md:mx-10 lg:mx-16 p-6 md:p-10 rounded-2xl text-black">

  <h1 className=" font-serif text-2xl md:text-3xl lg:text-4xl text-orange-400 ">
    Why Choose Us?
  </h1>



  
  <p className="text-black/60  max-w-3xl mt-2 text-sm md:text-base leading-relaxed">
    The Raj Mudra Travelers is dedicated to delivering safe, comfortable, and
    affordable travel experiences with exceptional service quality.
  </p>

  
  <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 ">

    {cards.map((card, index) => (
      <div
        key={index}
        className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
      >
        
        <div className="h-45 overflow-hidden">
          <img
            src={`${card.img}?auto=format&fit=crop&w=800&q=80`}
            alt={card.title}
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
          />
        </div>

        <div className="p-5 text-center">
          <h3 className="text-lg font-semibold text-gray-900">
            {card.title}
          </h3>
          <p className="text-gray-600 text-sm mt-2 leading-relaxed">
            {card.desc}
           
          </p>
          <div className='flex justify-center '> 
           <button className='text-white cursor-pointer bg-orange-400 py-1 px-2 mt-2'> Read More
          <FaLongArrowAltRight  className='inline-block ml-2 ' /> </button>
          </div>
           
        </div>
      </div>
    ))}

  </div>
</div>

  )
}

export default WhyChooseUs