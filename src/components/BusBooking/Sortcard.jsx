import React from 'react';
import { FaArrowUpLong } from 'react-icons/fa6';

const Sortcard = () => {
  const sortOptions = [
    { label: "Price" },
    { label: "Seats" },
    { label: "Ratings" },
    { label: "Arrival Time" },
    { label: "Departure Time" },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto mt-8 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      
      {/* Top Header Row */}
      <div className="flex justify-between items-center px-6 py-4">
        <h3 className="font-bold text-gray-800 text-lg">Sort by</h3>
        
        <div className="flex items-center gap-2">
           
           <span className="text-orange-600 font-semibold text-sm">
             Showing 799 Buses on this route
           </span>
        </div>
      </div>

      {/* Thin Divider Line */}
      <div className="w-full h-[1px] bg-gray-100 px-6 mx-auto"></div>

      {/* Sort Options Grid */}
      <div className="px-4 py-3">
        <ul className="flex items-center divide-x divide-gray-200">
          {sortOptions.map((item, index) => (
            <li 
              key={index} 
              className="flex-1 flex items-center justify-center gap-2 py-2 cursor-pointer hover:bg-gray-50 group transition-colors"
            >
              <span className="text-gray-600 font-bold text-sm group-hover:text-orange-500">
                {item.label}
              </span>
              <FaArrowUpLong className="text-gray-400 text-xs group-hover:text-orange-500 transition-transform" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sortcard;