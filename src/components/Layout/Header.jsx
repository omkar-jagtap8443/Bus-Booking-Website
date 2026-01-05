import React, { useState } from "react";
import { FaBusSimple } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [open, setOpen] = useState(false);
   const navigate=useNavigate();
  return (
    <header className="bg-black text-white w-full   ">
     
      <div className="flex items-center justify-between h-20 px-3 md:px-6 lg:px-12">
        
        {/* Logo */}
        <div className="flex items-center gap-2">
          <FaBusSimple className="text-orange-400 text-lg md:text-2xl" />
          <h1 className="text-sm md:text-xl lg:text-2xl font-bold">
            logo
          </h1>
        </div>

       
        <h2 className="text-sm md:text-lg lg:text-2xl font-semibold">
          Raj<span className="text-orange-400"> Mudra </span>Travels
        </h2>

       
        <nav className="hidden sm:flex gap-4 md:gap-6 lg:gap-10 ">
          <a className="hover:text-orange-400 transition-all ease-in-out hover:scale-105" href="/">Bus booking</a>
          <a className="hover:text-orange-400 transition-all ease-in-out hover:scale-105" href="/About" onClick={() => navigate("/About")}>About us</a>
          <a className="hover:text-orange-400 transition-all ease-in-out hover:scale-105" href="/">Services</a>
          <a className="hover:text-orange-400 transition-all ease-in-out hover:scale-105" href="/Contact " onClick={()=>navigate("/Contact")}>Contact</a>
        </nav>

      
        <button
          className="sm:hidden text-2xl"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
      </div>

      {open && (
        <div className="sm:hidden bg-black border-t border-gray-700 px-4 py-3 space-y-3">
          <a className="block hover:text-orange-400" href="/">Bus booking</a>
          <a className="block hover:text-orange-400" href="/About" onClick={() => navigate("/About")}>About us</a>
          <a className="block hover:text-orange-400" href="/">Services</a>
          <a className="block hover:text-orange-400" href="/Contact " onClick={()=>navigate("/Contact")}>Contact</a>
        </div>
      )}
    </header>
  );
};

export default Header;
