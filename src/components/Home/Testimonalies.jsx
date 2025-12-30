import React from 'react'
import { FcRating } from "react-icons/fc";

const Testimonalies = () => {

  const testimonials = [
    {
      img: "https://i.pinimg.com/736x/2e/f8/39/2ef83928873282d968e9f6c497df8c37.jpg",
      name: "Siddesh Jadhav",
      desc: "The Raj Mudra Travelers provided an exceptional travel experience. The bus was clean and comfortable, the staff were friendly and professional."
    },
    {
      img: "https://i.pinimg.com/1200x/a4/ad/e3/a4ade34601af89c976de99b6c1cb42a5.jpg",
      name: "Vivek Jangam",
      desc: "The Raj Mudra Travelers provided an exceptional travel experience. The bus was clean and comfortable, the staff were friendly and professional."
    },
    {
      img: "https://i.pinimg.com/736x/2e/f8/39/2ef83928873282d968e9f6c497df8c37.jpg",
      name: "Abhi Jagtap",
      desc: "The Raj Mudra Travelers provided an exceptional travel experience. The bus was clean and comfortable, the staff were friendly and professional."
    },
    {
      img: "https://i.pinimg.com/736x/94/84/53/948453da7013aa0adab11e82b3237057.jpg",
      name: "Akash Mahade",
      desc: "The Raj Mudra Travelers provided an exceptional travel experience. The bus was clean and comfortable, the staff were friendly and professional."
    },
  ];

  return (
    <div className="bg-white/90 mt-6 mx-4 md:mx-10 lg:mx-16 p-6 md:p-10 rounded-2xl">

   
      <h1 className="font-serif text-2xl md:text-3xl lg:text-4xl text-orange-400">
        Testimonials
      </h1>
      <p className="text-black/60 mt-1 mb-6">
        What our customers say about us
      </p>

    
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

        {testimonials.map((test, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl overflow-hidden shadow-md 
                       hover:shadow-2xl hover:-translate-y-2 
                       transition-all duration-300 flex flex-col"
          >

         
            <div className="h-full object-cover overflow-hidden">
              <img
                src={test.img}
                alt={test.name}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
              />
            </div>

        
            <div className="p-5 text-center flex flex-col flex-1">
              <h3 className="text-lg font-semibold text-gray-900">
                {test.name}
              </h3>

              <p className="text-gray-600 text-sm mt-2 line-clamp-4">
                {test.desc}
              </p>
              <FcRating />
            </div>

          </div>
        ))}

      </div>
    </div>
  );
};



export default Testimonalies