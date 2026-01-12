import React from 'react';
import Safetylogo from '../../assets/Images/Safetylogo.png';
import Ontimeservicelogo from '../../assets/Images/Ontimeservicelogo.png';
import Luxurytravellogo from '../../assets/Images/Luxurytravellogo.png';
import Servicelogo from '../../assets/Images/Servicelogo.png';
import Trustlogo from '../../assets/Images/Trustlogo.png';
import FutureForward from '../../assets/Images/FutureForward.png';

const OurValues = () => {
  const allFeatures = [
    { img: Safetylogo, title: "Safety First", color: "orange" },
    { img: Ontimeservicelogo, title: "On Time Service", color: "orange" },
    { img: Luxurytravellogo, title: "Luxury Travel", color: "orange" },
    { img: Servicelogo, title: "Quality Service", color: "blue" },
    { img: Trustlogo, title: "Customer Trust", color: "blue" },
    { img: FutureForward, title: "Future Forward", color: "blue" },
  ];

  return (
    <section
      id="our-values-section"
      className="relative py-20 px-4 md:px-10 lg:px-20 bg-white overflow-hidden transition-[outline-color] duration-500"
    >
      
      {/* Background Glows for Depth */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-100/40 rounded-full blur-3xl opacity-60" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl opacity-60" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="bg-white/70 backdrop-blur-xl border border-slate-100 rounded-[3rem] shadow-2xl p-10 md:p-16">
          
          {/* Header Section */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">
              Our Core <span className="text-orange-500">Commitment</span>
            </h2>
            <div className="h-1.5 w-24 bg-gradient-to-r from-orange-500 to-blue-500 mx-auto rounded-full" />
            <p className="mt-6 text-slate-500 text-lg max-w-2xl mx-auto leading-relaxed">
              At Raj Mudra, our values and indicators drive us to provide a travel experience that is safe, punctual, and future-ready.
            </p>
          </div>

          {/* Unified Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 md:gap-12">
            {allFeatures.map((item, index) => (
              <div key={index} className="flex flex-col items-center group">
                {/* Icon Container */}
                <div className={`
                  w-20 h-20 md:w-24 md:h-24 rounded-3xl mb-4 flex items-center justify-center p-4 
                  bg-white shadow-md border border-slate-50
                  transition-all duration-500 group-hover:scale-110 group-hover:-translate-y-2
                  ${item.color === 'orange' ? 'group-hover:shadow-orange-200' : 'group-hover:shadow-blue-200'}
                `}>
                  <img 
                    src={item.img} 
                    alt={item.title} 
                    className="w-full h-full object-contain" 
                  />
                </div>
                
                {/* Title */}
                <h3 className="text-slate-800 font-bold text-xs md:text-sm text-center uppercase tracking-wider group-hover:text-slate-900">
                  {item.title}
                </h3>
                
                {/* Small indicator dot */}
                <div className={`mt-2 h-1 w-1 rounded-full ${item.color === 'orange' ? 'bg-orange-400' : 'bg-blue-400'}`} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurValues;