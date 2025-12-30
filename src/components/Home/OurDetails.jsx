import React from 'react'
import { MdAccessTime } from "react-icons/md";
import { FaBus } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { FaServicestack } from "react-icons/fa";

const OurDetails = () => {

    const stats = [
  {
    icon: MdAccessTime,
    value: "30+",
    label: "Years of Experience",
  },
  {
    icon: FaBus,
    value: "1200+",
    label: "Vehicles",
  },
  {
    icon: CgProfile,
    value: "4000+",
    label: "Man Power",
  },
  {
    icon: FaServicestack,
    value: "85+",
    label: "City Service",
  },
];

  return (
    <div className="bg-white/90 mt-6 mx-4 md:mx-10 lg:mx-16 p-6 md:p-10 rounded-2xl text-black">

     
      <h1 className="font-serif text-2xl md:text-3xl lg:text-4xl text-orange-400">
        Our Details
      </h1>

      
      <p className="text-black/60 max-w-3xl mt-2 text-sm md:text-base leading-relaxed">
        The Raj Mudra Travelers is dedicated to delivering safe, comfortable, and
        affordable travel experiences with exceptional service quality.
      </p>

      
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

        {stats.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              key={index}
              className="
                bg-white 
                rounded-xl 
                shadow-md 
                hover:shadow-xl 
                hover:-translate-y-2
                transition-all 
                duration-300
                p-6 
                flex 
                flex-col 
                items-center 
                text-center
              "
            >
            
              <div className="bg-gray-200 text-orange-500 p-4 rounded-full mb-4">
                <Icon size={32} />
              </div>

              <h2 className="text-2xl font-bold text-gray-900">
                {item.value}
              </h2>

             
              <p className="text-gray-600 text-sm mt-1">
                {item.label}
              </p>
            </div>
          );
        })}

      </div>
    </div>
  );
};


export default OurDetails