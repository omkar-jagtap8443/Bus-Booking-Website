import React, { useCallback } from 'react';

const Herocontain = () => {
  const trustdata = [
    {
      title: "Reliable Service",
      img: "https://i.pinimg.com/736x/74/5d/2a/745d2a1545e438c93ef2898546023a0e.jpg",
      desc: "With over 20 years in the industry, our punctuality and commitment to schedule are unmatched. We don't just move people; we move them with precision.",
      accent: "bg-orange-500"
    },
    {
      title: "Safety First",
      img: "https://i.pinimg.com/736x/22/5a/b0/225ab0b2116338faf91cd89f868d8a54.jpg", 
      desc: "Our vehicles undergo rigorous safety checks every 24 hours. Combined with our certified professional drivers, your peace of mind is our highest priority.",
      accent: "bg-blue-600"
    },
    {
      title: "Luxury Fleet",
      img: "https://i.pinimg.com/736x/4a/cb/5b/4acb5b80ad433be5993bd3e4c0ae0739.jpg",
      desc: "Experience travel like never before. Our modern fleet features reclining leather seats, individual climate control, and high-speed Wi-Fi for every passenger.",
      accent: "bg-orange-500"
    },
  ];

  const handleLearnMore = useCallback(() => {
    const target = document.getElementById('our-values-section');
    if (!target) return;

    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    target.classList.add('outline', 'outline-4', 'outline-orange-400');
    setTimeout(() => {
      target.classList.remove('outline', 'outline-4', 'outline-orange-400');
    }, 1800);
  }, []);

  return (
    <section className="w-full bg-white py-20 px-4 md:px-10">
      <div className="max-w-7xl mx-auto space-y-24 md:space-y-32">
        {trustdata.map((item, index) => (
          <div 
            key={index} 
            className={`flex flex-col items-center gap-10 md:gap-20 ${
              index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
            }`}
          >
            {/* Image Side */}
            <div className="w-full md:w-1/2">
              <div className="group relative overflow-hidden rounded-[2.5rem] shadow-2xl">
                <img 
                  src={item.img} 
                  alt={item.title} 
                  className="w-full h-[350px] md:h-[500px] object-cover transition-transform duration-700 group-hover:scale-110" 
                />
                {/* Subtle overlay for depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>
            </div>

            {/* Text Side */}
            <div className="w-full md:w-1/2 space-y-6">
              <div className={`h-1.5 w-16 ${item.accent} rounded-full mb-4`} />
              
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight tracking-tight">
                {item.title}
              </h2>
              
              <p className="text-slate-600 text-lg md:text-xl leading-relaxed font-medium">
                {item.desc}
              </p>
              
              <div className="pt-4">
                <button
                  type="button"
                  onClick={handleLearnMore}
                  className="px-8 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-orange-500 transition-all shadow-lg hover:shadow-orange-200 active:scale-95"
                >
                  Learn More
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Herocontain;