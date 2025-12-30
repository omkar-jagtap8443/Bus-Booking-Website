import React from "react";

const ImageBackground = () => {
  return (
    <div
      className="relative w-full h-screen overflow-hidden bg-center bg-cover"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3Dauto=format&fit=crop&w=1470&q=80')",
      }}
    >

      <div className="absolute inset-0 bg-black/40"></div>

     
      <div className="relative z-10 flex items-center justify-center h-full text-center px-4">
        <div>
          <h1 className="text-white text-4xl md:text-5xl font-bold">
            Welcome to Raj <span className="text-orange-400">Mudra </span>Travels
          </h1>
          <p className="text-white/90 mt-4 max-w-xl mx-auto">
            Experience premium travel like never before.
          </p>
        x

          <button className="mt-6 bg-orange-400 text-white px-6 py-3 rounded-lg hover:bg-orange-500 transition">
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageBackground;
