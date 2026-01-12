import React from 'react';
import { FaArrowUpLong } from 'react-icons/fa6';

const sortOptions = [
  { label: 'Price', value: 'price' },
  { label: 'Seats', value: 'seats' },
  { label: 'Ratings', value: 'rating' },
  { label: 'Arrival Time', value: 'arrival' },
  { label: 'Departure Time', value: 'departure' },
];

const Sortcard = ({ currentSort, onSortChange, resultCount, isLoading }) => (
  <div className="w-full max-w-6xl mx-auto mt-8 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
    <div className="flex justify-between items-center px-6 py-4">
      <h3 className="font-bold text-gray-800 text-lg">Sort by</h3>

      <div className="flex items-center gap-2">
        <span className="text-orange-600 font-semibold text-sm">
          {isLoading ? 'Loading buses…' : `Showing ${resultCount} buses`}
        </span>
      </div>
    </div>

    <div className="w-full h-[1px] bg-gray-100" />

    <div className="px-4 py-3">
      <ul className="flex items-center divide-x divide-gray-200">
        {sortOptions.map(item => (
          <li
            key={item.value}
            className={`flex-1 flex items-center justify-center gap-2 py-2 cursor-pointer transition-colors ${currentSort === item.value ? 'bg-orange-50 text-orange-600' : 'hover:bg-gray-50'}`}
            onClick={() => onSortChange(item.value)}
          >
            <span className="text-sm font-bold">
              {item.label}
            </span>
            <FaArrowUpLong className="text-xs" />
          </li>
        ))}
      </ul>
    </div>
  </div>
);

Sortcard.defaultProps = {
  currentSort: 'departure',
  onSortChange: () => {},
  resultCount: 0,
  isLoading: false,
};

export default Sortcard;