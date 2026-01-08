import React from "react";
import BgBus from "../../assets/Images/BgBus.png"; 
import Search from "./Search";

const ImageBackground = () => {
  return (
    <div className="relative w-full min-h-screen flex flex-col">
      {/* BACKGROUND LAYER */}
      <div 
        className="absolute inset-0 w-full h-[85vh] md:h-screen bg-center bg-cover bg-no-repeat z-0"
        style={{ backgroundImage: `url(${BgBus})` }}
      >
        {/* Dark Gradient Overlay for Text Pop */}
        <div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/40 to-transparent" />
      </div>

      {/* CONTENT LAYER */}
      <div className="relative z-10 flex flex-col items-center justify-center pt-24 md:pt-32 pb-40 text-center px-6">
        <h1 className="text-white text-4xl md:text-7xl font-black italic tracking-tighter uppercase leading-tight">
          Welcome To <br /> 
          <span className="text-orange-500 drop-shadow-lg">Raj Mudra</span> Travels
        </h1>
        
        <p className="text-gray-200 mt-6 max-w-xl text-lg md:text-2xl font-medium tracking-wide">
          Redefining Luxury Intercity Travel.
        </p>

        {/* Hero Action Buttons */}
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <button className="bg-orange-600 hover:bg-orange-700 text-white px-8 md:px-12 py-4 rounded-2xl font-black transition-all transform hover:-translate-y-1 shadow-xl shadow-orange-900/20 active:scale-95">
            BOOK MY SEAT
          </button>
          <button className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 md:px-12 py-4 rounded-2xl font-black hover:bg-white/20 transition-all active:scale-95">
            EXPLORE ROUTES
          </button>
        </div>
      </div>

      {/* SEARCH COMPONENT (Overlapping the Hero) */}
      <div className="relative z-30 w-full -mt-32 md:-mt-24">
        <Search />
      </div>
    </div>
  );
};

export default ImageBackground;