import React from 'react';
import { FcRating } from "react-icons/fc";
import { FaQuoteLeft } from "react-icons/fa"; // Added for a more "cool" professional look

const Testimonalies = () => {
  const testimonials = [
    {
      img: "https://i.pinimg.com/736x/2e/f8/39/2ef83928873282d968e9f6c497df8c37.jpg",
      name: "Siddesh Jadhav",
      role: "Verified Traveler",
      desc: "The Raj Mudra Travelers provided an exceptional travel experience. The bus was clean and comfortable, the staff were friendly and professional."
    },
    {
      img: "https://i.pinimg.com/1200x/a4/ad/e3/a4ade34601af89c976de99b6c1cb42a5.jpg",
      name: "Vivek Jangam",
      role: "Regular Commuter",
      desc: "Exceptional service! The punctuality of Raj Mudra is what keeps me coming back. Best premium bus service in the city by far."
    },
    {
      img: "https://i.pinimg.com/736x/2e/f8/39/2ef83928873282d968e9f6c497df8c37.jpg",
      name: "Abhi Jagtap",
      role: "Business Traveler",
      desc: "Cleanliness and comfort are my top priorities, and Raj Mudra delivers both perfectly. The staff goes above and beyond for passengers."
    },
    {
      img: "https://i.pinimg.com/736x/94/84/53/948453da7013aa0adab11e82b3237057.jpg",
      name: "Akash Mahade",
      role: "Verified Traveler",
      desc: "A truly hassle-free experience. From booking to drop-off, everything was seamless. Highly recommended for long distance travel."
    },
  ];

  return (
    <section className="relative overflow-hidden py-20 px-4 md:px-10 lg:px-20 
      bg-[#f8fafc] 
      bg-[radial-gradient(circle_at_top_right,_#fff7ed_0%,_#f8fafc_50%,_#eff6ff_100%)]">
      
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-4">
          <div className="text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight">
              Voices of Our <span className="text-orange-500 underline decoration-orange-200 decoration-8 underline-offset-4">Passengers</span>
            </h2>
            <p className="text-slate-500 mt-4 text-lg italic">
              Real stories from real travelers who choose Raj Mudra.
            </p>
          </div>
          <div className=" text-black px-6 py-3 rounded-2xl shadow-lg bg-white font-bold hidden md:block cursor-pointer">
            4.8/5 Average Rating
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {testimonials.map((test, index) => (
            <div
              key={index}
              className="group relative bg-white/70 backdrop-blur-md border border-white p-8 rounded-[2.5rem] shadow-sm hover:shadow-2xl hover:shadow-orange-200/40 transition-all duration-500 hover:-translate-y-4 flex flex-col h-full"
            >
              {/* Quote Icon Accent */}
              <FaQuoteLeft className="text-orange-200 text-4xl mb-4 group-hover:text-orange-400 transition-colors duration-300" />

              {/* Text Content */}
              <div className="flex-grow">
                <p className="text-slate-600 text-sm leading-relaxed italic mb-6">
                  "{test.desc}"
                </p>
              </div>

              {/* Footer: User Profile */}
              <div className="flex items-center gap-4 pt-6 border-t border-slate-100">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-orange-400 p-0.5">
                  <img
                    src={test.img}
                    alt={test.name}
                    className="w-full h-full object-cover rounded-full transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 leading-none">
                    {test.name}
                  </h3>
                  <div className="flex gap-0.5 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <FcRating key={i} className="text-[10px]" />
                    ))}
                  </div>
                </div>
              </div>

              {/* Decorative Corner Glow */}
              <div className="absolute -bottom-2 -right-2 w-20 h-20 bg-orange-400/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonalies;