import React from 'react';
import { IoLogoWhatsapp } from "react-icons/io";
import { BiLogoDiscordAlt, BiLogoPeriscope } from "react-icons/bi";
import { PiDevToLogoFill } from "react-icons/pi";

const OurBrands = () => {
  const brands = [
    { icon: <IoLogoWhatsapp size={40} />, label: "WhatsApp", color: "hover:text-green-500" },
    { icon: <BiLogoDiscordAlt size={40} />, label: "Discord", color: "hover:text-indigo-500" },
    { icon: <BiLogoPeriscope size={40} />, label: "Periscope", color: "hover:text-blue-400" },
    { icon: <PiDevToLogoFill size={40} />, label: "Dev.to", color: "hover:text-black" },
  ];

  return (
    <section className="relative overflow-hidden py-16 px-4 md:px-10 lg:px-20 
      bg-[#f8fafc] 
      bg-[radial-gradient(circle_at_top_right,_#fff7ed_0%,_#f8fafc_50%,_#eff6ff_100%)]">
      
      <div className="relative z-10 max-w-7xl mx-auto">
       
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">
            Our Official <span className="text-orange-500">Partners</span>
          </h2>
          <p className="text-slate-500 mt-3 text-sm md:text-base max-w-xl mx-auto italic">
            Collaborating with world-class platforms to provide you with a seamless digital booking experience.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 ">
          {brands.map((brand, index) => (
            <div
              key={index}
              className="group relative bg-white/60 backdrop-blur-md border border-black rounded-3xl p-8 
                         flex flex-col items-center justify-center transition-all duration-500 
                         hover:bg-white hover:shadow-2xl hover:shadow-orange-200/40 hover:-translate-y-2 cursor-pointer "
            >
         
              <span className="absolute top-4 right-6 text-slate-100 font-black text-4xl group-hover:text-orange-50 transition-colors">
               
              </span>

           
              <div className={`text-black transition-all duration-300  transform group-hover:scale-110 ${brand.color}`}>
                {brand.icon}
              </div>

              <h3 className="mt-4 font-bold text-slate-400 group-hover:text-slate-900 transition-colors tracking-wide uppercase text-xs">
                {brand.label}
              </h3>

              <div className="mt-2 w-0 h-0.5 bg-orange-400 group-hover:w-8 transition-all duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurBrands;