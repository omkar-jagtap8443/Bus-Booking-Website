import React from 'react'
import { FaBusSimple } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";


const Seacrh = () => {
  return (
       
      <div className="w-full max-w-6xl bg-white/90 h-40 rounded-md mx-auto my-2">
        
        <div className="flex justify-between p-4 text-black/70">
          
          <ul className="flex gap-2 ">
           <FaBusSimple  className='text-orange-500' /> <li className="font-bold cursor-pointer hover:bg-orange-400 rounded-md px-2 hover:text-white  ">Buses</li>
           <FaBusSimple  className='text-orange-500' />  <li className="font-bold cursor-pointer hover:bg-orange-400 rounded-md px-2 hover:text-white">Hotels</li>
           <FaBusSimple  className='text-orange-500' />  <li className="font-bold  cursor-pointer hover:bg-orange-400 rounded-md px-2 hover:text-white">Resorts</li>
          <FaBusSimple  className='text-orange-500' />   <li className="font-bold cursor-pointer hover:bg-orange-400 rounded-md px-2 hover:text-white">Launce</li>
          </ul>

         <h2 className='font-bold text-black'>India's Fastest Bus Ticket Booking Platform</h2>
        </div>


        <div className='bg-white/70 rounded-md w-205 mx-auto h-20  flex '>
           <div className='flex items-center mx-2 gap-1'>
             <div className='flex justify-center items-center px-15 rounded-md h-12  gap-1'>
            <FaBusSimple />
            <h2>Pune</h2>
            
          </div>

           <div className='flex justify-center items-center  px-15 rounded-md h-12 gap-1 '>
            <FaBusSimple />
            <h2>Solapur</h2>
            
          </div>

              <div className='flex flex-col items-center justify-center px-10 rounded-md h-12 gap-1 '>
            
            <h2 >Departure</h2>
            
          </div>

               <div className='flex flex-col items-center justify-center px-4 rounded-md h-12 gap-1 '>
            
            <h2 >Today</h2>
            
          </div>

              <div className='flex flex-col items-center justify-center px-4 rounded-md h-12 gap-1 '>
            
            <h2 >Tommorow</h2>
            
          </div>

             <div className='flex  items-center justify-center px-4 rounded-md h-12 bg-red-600 gap-1 '>
           
            <button className=' text-white font-bold cursor-pointer'>Search </button> <FaSearch className='text-white font-bold ml-2' />
            
            
          </div>

          
           </div>

         

        </div>
        
       

      </div>
        
  )
}

export default Seacrh