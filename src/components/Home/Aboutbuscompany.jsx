import React from 'react';
import { HiOutlineLightBulb, HiOutlineBadgeCheck } from "react-icons/hi"; // Modern icons

const Aboutbuscompany = () => {
  return (
    <section className="relative overflow-hidden py-20 px-4 md:px-10 lg:px-20 
      bg-[#f8fafc] 
      bg-[radial-gradient(circle_at_top_right,_#fff7ed_0%,_#f8fafc_50%,_#eff6ff_100%)]">
      
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-12">
          <span className="text-orange-500 font-bold uppercase tracking-[0.2em] text-xs mb-3 block">
            Discovery
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900">
            About <span className="text-orange-500">Raj Mudra</span>
          </h2>
          <div className="h-1.5 w-20 bg-orange-400 mt-4 rounded-full" />
        </div>

        {/* Main Content Card */}
        <div className="bg-white/70 backdrop-blur-xl border border-white rounded-[3rem] p-8 md:p-16 shadow-2xl shadow-slate-200/50">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Column: Narrative */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-slate-800">Revolutionizing Your Journey</h3>
              <p className="text-slate-600 leading-relaxed text-lg">
                Founded with a vision to revolutionize bus travel, <span className="font-semibold text-slate-900">Raj Mudra Travels</span> has been connecting people to their destinations for years. What started as a small fleet serving local routes has grown into a trusted name in passenger transportation.
              </p>
              <p className="text-slate-500 leading-relaxed">
                We've built our reputation on reliability, safety, and exceptional customer service, making every journey a testament to our commitment to excellence. We are more than just a bus company – we are your travel partner.
              </p>
              
              {/* Stats/Quick Info within About */}
              <div className="grid grid-cols-2 gap-6 pt-6">
                <div className="border-l-4 border-orange-500 pl-4">
                  <h4 className="text-2xl font-bold text-slate-900">Reliability</h4>
                  <p className="text-xs text-slate-500 uppercase font-bold tracking-tighter">Guaranteed Service</p>
                </div>
                <div className="border-l-4 border-blue-500 pl-4">
                  <h4 className="text-2xl font-bold text-slate-900">Safety</h4>
                  <p className="text-xs text-slate-500 uppercase font-bold tracking-tighter">First Priority</p>
                </div>
              </div>
            </div>

            {/* Right Column: Mission & Vision Cards */}
            <div className="grid gap-6">
              <div className="group p-8 rounded-[2rem] text-black transition-all hover:scale-[1.02] shadow-xl ">
                <HiOutlineLightBulb className="text-4xl mb-4 group-hover:rotate-12 transition-transform" />
                <h4 className="text-xl font-bold mb-2">Our Mission</h4>
                <p className="text-slate-700 leading-relaxed text-sm">
                  To provide world-class transportation that combines luxury, punctuality, and safety, making high-end travel accessible to everyone.
                </p>
              </div>

              <div className="group p-8 rounded-[2rem] text-black transition-all hover:scale-[1.02] shadow-xl">
                <HiOutlineBadgeCheck className="text-4xl text-blue-600 mb-4" />
                <h4 className="text-xl font-bold text-slate-900 mb-2">Our Vision</h4>
                <p className="text-slate-500 leading-relaxed text-sm">
                  To become India's most preferred travel partner by setting new benchmarks in hospitality and road safety standards.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Aboutbuscompany;