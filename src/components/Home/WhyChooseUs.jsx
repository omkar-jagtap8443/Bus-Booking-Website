import React from "react";

const WhyChooseUs = () => {
  const cards = [
    {
      title: "Luxury Buses",
      img: "https://plus.unsplash.com/premium_photo-1661963208071-9a65b048ebaf?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?auto=format&fit=crop&w=800&q=80",
      desc: "Enjoy premium buses with spacious seating, comfort and modern amenities."
    },
    {
      title: "Safe Journeys",
      img: "https://i.pinimg.com/736x/4a/4d/07/4a4d076906de8283314a41d9c5977826.jpg?auto=format&fit=crop&w=800&q=80",
      desc: "Professional drivers and strict safety standards for worry-free travel."
    },
    {
      title: "Professional Staff",
      img: "https://i.pinimg.com/736x/90/b9/f6/90b9f6ed6aa751f6a53db5c5e4e7e298.jpg?auto=format&fit=crop&w=800&q=80",
      desc: "Well-trained staff ensuring smooth and friendly travel experiences."
    },
    {
      title: "On-Time Service",
      img: "https://plus.unsplash.com/premium_photo-1661963208071-9a65b048ebaf?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?auto=format&fit=crop&w=800&q=80",
      desc: "Punctual departures and arrivals so you always reach on time."
    }
  ];

  return (
    <div className="bg-white/90 mt-6 mx-4 md:mx-10 lg:mx-16 p-6 md:p-10 rounded-2xl">


      <h1 className="font-extrabold  text-2xl md:text-3xl lg:text-4xl text-orange-500">
        Why Choose Us?
      </h1>

      <p className="text-black/60 max-w-3xl mt-2 text-sm md:text-base">
        The Raj Mudra Travelers is committed to safe, comfortable and affordable
        travel experiences with exceptional service quality.
      </p>

      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, index) => (
          <div
            key={index}
            className="group relative h-87.5 rounded-2xl overflow-hidden shadow-lg"
          >
         
            <img
              src={card.img}
              alt={card.title}
              className="absolute inset-0 w-full h-full object-cover object-top
                         transition-transform duration-700 ease-out
                         group-hover:scale-105"
            />

         
            <div
              className="absolute inset-0 bg-linear-to-b
                         from-black/0 via-black/20 to-black/80
                         translate-y-1/2 group-hover:translate-y-0
                         transition-transform duration-700 ease-out"
            />

            {/* Content */}
            <div
              className="relative z-10 h-full flex flex-col justify-end items-center
                         text-center px-4 pb-6
                         translate-y-1/3 group-hover:translate-y-0
                         transition-transform duration-700 ease-out"
            >
              <h2 className="text-white text-lg font-bold tracking-wide">
                {card.title}
              </h2>

              <p
                className="mt-3 text-white/90 text-sm italic
                           opacity-0 translate-y-4
                           group-hover:opacity-100 group-hover:translate-y-0
                           transition-all duration-700 ease-out"
              >
                {card.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhyChooseUs;
