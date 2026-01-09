import React from 'react';
import {useNavigate} from "react-router-dom";
import { 
  FaBus, 
  FaHotel, 
  FaMountainSun, 
  FaLocationDot, 
  FaCalendarDays, 
  FaMagnifyingGlass,
  FaArrowRightArrowLeft 
} from "react-icons/fa6";


const Search = () => {
  const navigate=useNavigate();

  return (
    <div className="w-full px-4 max-w-7xl mx-auto">
      <div className="bg-white/90 backdrop-blur-xl rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] p-4 md:p-6 border border-white/50">
        
        {/* TABS SECTION */}
        <div className="flex items-center justify-between mb-6 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            <button className="flex items-center gap-2 px-6 py-2.5  text-black hover:bg-white rounded-md text-sm font-black whitespace-nowrap transition-all">
              <FaBus /> BUSES
            </button>
            <button className="flex items-center gap-2 px-6 py-2.5 text-black hover:bg-white rounded-md text-sm font-black whitespace-nowrap transition-all">
              <FaHotel /> HOTELS
            </button>
          </div>
          <p className='hidden lg:block font-extrabold text-black text-xs tracking-widest uppercase'>
            India's Fastest Booking Platform
          </p>
        </div>

        {/* INPUTS GRID */}
        <div className="flex flex-col lg:grid lg:grid-cols-12 bg-slate-50 rounded-3xl lg:rounded-full p-2 border border-slate-200 gap-2 lg:gap-0">
          
          {/* FROM */}
          <div className="lg:col-span-3 flex items-center px-6 py-4 lg:py-3 gap-4 bg-white lg:bg-transparent rounded-2xl lg:rounded-none border-b lg:border-b-0 lg:border-r border-slate-400">
            <FaLocationDot className="text-orange-500 text-xl lg:text-lg" />
            <div className="flex flex-col flex-1">
              <span className="text-[10px] uppercase font-black text-slate-400">From</span>
              <input type="text" placeholder="Departure City" className="bg-transparent font-bold text-slate-800 outline-none w-full text-base placeholder:text-slate-300" defaultValue="Pune" />
            </div>
          </div>

          {/* TO */}
          <div className="lg:col-span-3 flex items-center px-6 py-4 lg:py-3 gap-4 bg-white lg:bg-transparent rounded-2xl lg:rounded-none border-b lg:border-b-0 lg:border-r border-slate-400 relative">
         
            <FaLocationDot className="text-orange-500 text-xl lg:text-lg" />
            <div className="flex flex-col flex-1">
              <span className="text-[10px] uppercase font-black text-slate-400">To</span>
              <input type="text" placeholder="Arrival City" className="bg-transparent font-bold text-slate-800 outline-none w-full text-base placeholder:text-slate-300" defaultValue="Solapur" />
            </div>
          </div>

          {/* DATE & DAY */}
          <div className="lg:col-span-4 flex bg-white lg:bg-transparent rounded-2xl lg:rounded-none overflow-hidden divide-x divide-slate-100 lg:divide-slate-400">
             <div className="flex-1 flex items-center gap-4 px-6 py-4 lg:py-3 group cursor-pointer hover:bg-slate-100/50 transition-all">
                <FaCalendarDays className="text-orange-500 text-xl lg:text-lg" />
                <div className="flex flex-col">
                    <span className="text-[10px] uppercase font-black text-slate-400 block">Departure</span>
                    <span className="font-bold text-slate-800 text-sm whitespace-nowrap">08 Jan 2026</span>
                </div>
             </div>
             <div className="flex-1 flex flex-col justify-center px-6 py-4 lg:py-3 cursor-pointer hover:bg-slate-100/50 transition-all">
                <span className="text-[10px] uppercase font-black text-slate-400">Quick Select</span>
                <span className="font-bold text-black text-sm">Tomorrow</span>
             </div>
          </div>

          {/* SEARCH BUTTON */}
          <div className="lg:col-span-2 mt-2 lg:mt-0 lg:p-1">
            <button className="w-full cursor-pointer py-5 lg:h-full bg-red-600 text-white font-black rounded-2xl lg:rounded-full flex items-center justify-center gap-3 transition-all ">
              <FaMagnifyingGlass className="text-xl group-hover:scale-125 transition-transform" /> 
              <span className="tracking-widest"onClick={()=>{navigate("/s-to-d")}}>SEARCH</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Search;