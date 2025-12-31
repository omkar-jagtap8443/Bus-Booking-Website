import React from "react";
// Go up two levels (../../) to reach the src folder, then into assets
import BgBus from "../../assets/Images/BgBus.png"; 

const ImageBackground = () => {
  return (
    <div 
      className="relative w-full h-[100dvh] overflow-hidden bg-center bg-cover bg-no-repeat"
      style={{ backgroundImage: `url(${BgBus})` }}
    >
      {/* Dark Overlay to make the text pop */}
      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
        <h1 className="text-white/90 text-4xl md:text-6xl font-bold italic tracking-tight uppercase">
         Welcome To <br /> Raj <span className="text-orange-500">Mudra</span> Travels
        </h1>
        <p className="text-gray-200 mt-4 max-w-xl text-lg md:text-2xl font-light">
          Redefining Luxury Intercity Travel.
        </p>
        
        <div className="mt-10 flex flex-wrap justify-center gap-5">
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-10 py-4 rounded-full font-bold transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(249,115,22,0.4)]">
            Book My Seat
          </button>
          <button className="bg-white/5 backdrop-blur-lg border border-white/20 text-white px-10 py-4 rounded-full font-bold hover:bg-white/10 transition-all">
            Explore Routes
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageBackground;