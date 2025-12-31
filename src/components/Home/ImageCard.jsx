import React from 'react'

const ImageCard = () => {

   const cards = [
    {
      title: "Bus 1",
      img: "https://i.pinimg.com/1200x/be/d9/5f/bed95f67a0643a9dcd08b39554c52f0e.jpg",
      desc: "Experience unparalleled comfort and safety with our top-notch bus services, designed to make your journey memorable."
    },
    {
      title: "Bus 2",
      img: "https://i.pinimg.com/1200x/be/d9/5f/bed95f67a0643a9dcd08b39554c52f0e.jpg",
       desc: "Experience unparalleled comfort and safety with our top-notch bus services, designed to make your journey memorable."
    },
    {
      title: "Bus 3",
      img: "https://i.pinimg.com/1200x/be/d9/5f/bed95f67a0643a9dcd08b39554c52f0e.jpg",
       desc: "Experience unparalleled comfort and safety with our top-notch bus services, designed to make your journey memorable."
    },
    {
      title: "Bus 4",
      img: "https://i.pinimg.com/1200x/be/d9/5f/bed95f67a0643a9dcd08b39554c52f0e.jpg",
       desc: "Experience unparalleled comfort and safety with our top-notch bus services, designed to make your journey memorable."
       
    },
    
  ];
  return (
    <>
      <div>
        <div className="bg-white/90 mt-6 mx-4 md:mx-10 lg:mx-16 p-6 md:p-10 rounded-2xl overflow-hidden">
          <h1 className="font-serif text-2xl md:text-3xl lg:text-4xl text-orange-400">Our Fleet</h1>

  
          <div className="mt-8 relative">
            <div className="marquee-track gap-6" style={{"--marquee-duration":"30s"}}>
              {/* First set */}
              {cards.map((card, index) => (
                <div key={`set1-${index}`} className="group relative w-64 sm:w-72 lg:w-80 shrink-0  overflow-hidden bg-white shadow-md">
                  <div className="relative h-44 sm:h-52 lg:h-56 overflow-hidden">
                    <img
                      src={`${card.img}?auto=format&fit=crop&w=800&q=80`}
                      alt={card.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {/* Hover info overlay */}
                    <div className="absolute inset-0 bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center px-4 text-center">
                      <h3 className="text-lg font-semibold mb-2">{card.title}</h3>
                      <p className="text-sm leading-snug">{card.desc}</p>
                    </div>
                  </div>
                  <div className="p-4 text-center">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900">{card.title}</h3>
                    <button className="text-white bg-orange-400 py-1 px-3 mt-2 rounded-md">Read More</button>
                  </div>
                </div>
              ))}

              {cards.map((card, index) => (
                <div key={`set2-${index}`} className="group relative w-64 sm:w-72 lg:w-80 shrink-0  overflow-hidden bg-white shadow-md">
                  <div className="relative h-44 sm:h-52 lg:h-56 overflow-hidden">
                    <img
                      src={`${card.img}?auto=format&fit=crop&w=800&q=80`}
                      alt={card.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center px-4 text-center">
                      <h3 className="text-lg font-semibold mb-2">{card.title}</h3>
                      <p className="text-sm leading-snug">{card.desc}</p>
                    </div>
                  </div>
                  <div className="p-4 text-center">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900">{card.title}</h3>
                    <button className="text-white bg-orange-400 py-1 px-3 mt-2 rounded-md">Read More</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ImageCard