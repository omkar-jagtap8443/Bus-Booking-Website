import React, { useState } from 'react';

import { 
  FaRegSnowflake, 
  FaChair, 
  FaWind, 
  FaBed, 
  FaMapLocationDot, 
  FaBus, 
  FaTag,
  FaChevronDown,
  FaSun,
  FaCloudSun,
  FaMoon
} from "react-icons/fa6";

const Leftcard = () => {
  const [price, setPrice] = useState(436);

  const busTypes = [
    { icon: <FaWind />, label: "Non AC" },
    { icon: <FaChair />, label: "Seater" },
    { icon: <FaRegSnowflake />, label: "AC" },
    { icon: <FaBed />, label: "Sleeper" },
    { icon: <FaMapLocationDot />, label: "Bus Track" },
    { icon: <FaBus />, label: "New Buses" },
    { icon: <FaTag />, label: "Offers" },
  ];

  const timeSlots = [
    { icon: <FaCloudSun />, label: "Before 10 AM" },
    { icon: <FaSun />, label: "10 AM - 5 PM" },
    { icon: <FaCloudSun />, label: "5 PM - 11 PM" },
    { icon: <FaMoon />, label: "After 11 PM" },
  ];

  return (
    <div className='hidden lg:block bg-white w-80 ml-4 mt-8 min-h-screen border border-gray-200 rounded-2xl shadow-sm overflow-hidden mb-10 '>    
      {/* Header */}
      <div className=' flex justify-between items-center p-5'>
        <h2 className='font-bold text-gray-700 text-lg'>Filters</h2>
        <button className='text-gray-400 hover:text-orange-500 font-semibold text-sm transition-colors'>
          Clear All
        </button>
      </div>
      
      <div className='w-[90%] mx-auto h-[1px] bg-gray-100'></div>

      {/* Bus Type Section */}
      <div className='p-5'>
        <h3 className='font-bold text-gray-600 mb-4 text-sm uppercase tracking-wider'>Bus Type</h3>
        <div className='grid grid-cols-3 gap-3'>
          {busTypes.map((type, index) => (
            <button key={index} className='flex flex-col items-center justify-center p-3 border border-gray-100 rounded-xl hover:border-orange-500 hover:bg-orange-50 transition-all group'>
              <div className='text-gray-500 group-hover:text-orange-600 mb-2 text-xl'>
                {type.icon}
              </div>
              <span className='text-[10px] font-bold text-gray-500 text-center whitespace-nowrap uppercase'>
                {type.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Price Range Section */}
      <div className='p-5'>
        <h3 className='font-bold text-gray-600 mb-4 text-sm uppercase tracking-wider'>Price Range</h3>
        <input 
          type="range" 
          min="436" 
          max="9999" 
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className='w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-500'
        />
        <div className='flex justify-between mt-3 text-sm font-bold text-gray-700'>
          <span>₹436</span>
          <span>₹9999</span>
        </div>
        <div className='text-center text-orange-600 font-black mt-1'>
           Selected: ₹{price}
        </div>
      </div>

      {/* Departure Time Section */}
      <div className='p-5'>
        <h3 className='font-bold text-gray-600 mb-4 text-sm uppercase tracking-wider'>Departure Time</h3>
        <div className='grid grid-cols-2 gap-3'>
          {timeSlots.map((slot, index) => (
            <button key={index} className='flex flex-col items-center justify-center p-3 border border-gray-100 rounded-xl hover:border-orange-500 transition-all group bg-white'>
               <div className='text-gray-400 group-hover:text-orange-500 mb-1 text-lg'>
                {slot.icon}
              </div>
              <span className='text-[10px] font-bold text-gray-500 uppercase'>{slot.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Dropdown Selectors */}
      <div className='p-5 space-y-3'>
        {["Bus Partner", "Boarding Point", "Dropping Point"].map((label, idx) => (
          <button key={idx} className='w-full flex justify-between items-center p-4 border border-gray-100 rounded-2xl text-gray-500 font-bold text-sm hover:bg-gray-50'>
            {label}
            <FaChevronDown className='text-xs' />
          </button>
        ))}
      </div>
      
    </div>
    
   
  );
};

export default Leftcard;