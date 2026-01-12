import React from 'react';
import {
  FaRegSnowflake,
  FaChair,
  FaWind,
  FaBed,
  FaBus,
  FaChevronDown,
  FaSun,
  FaCloudSun,
  FaMoon,
} from 'react-icons/fa6';

const busTypeOptions = [
  { icon: <FaWind />, label: 'Non AC Seater', value: 'Non AC Seater' },
  { icon: <FaChair />, label: 'AC Seater', value: 'AC Seater' },
  { icon: <FaRegSnowflake />, label: 'AC Sleeper', value: 'AC Sleeper' },
  { icon: <FaBed />, label: 'Non AC Sleeper', value: 'Non AC Sleeper' },
  { icon: <FaBus />, label: 'Electric Luxury', value: 'Electric Luxury' },
];

const timeSlots = [
  { icon: <FaCloudSun />, label: 'Before 10 AM', value: 'BEFORE_10_AM' },
  { icon: <FaSun />, label: '10 AM - 5 PM', value: 'TEN_TO_FIVE_PM' },
  { icon: <FaCloudSun />, label: '5 PM - 11 PM', value: 'FIVE_TO_ELEVEN_PM' },
  { icon: <FaMoon />, label: 'After 11 PM', value: 'AFTER_11_PM' },
];

const Leftcard = ({ filters, onChange, priceBounds }) => {
  const minPrice = priceBounds?.min ?? 0;
  const maxPrice = priceBounds?.max ?? 2000;
  const sliderValue = Math.min(Math.max(filters.maxPrice || maxPrice, minPrice), maxPrice);

  const handleBusTypeToggle = (value) => {
    const current = filters.busTypes || [];
    const exists = current.includes(value);
    const updated = exists ? current.filter(item => item !== value) : [...current, value];
    onChange({ busTypes: updated });
  };

  const handleSlotToggle = (value) => {
    onChange({ departureSlot: filters.departureSlot === value ? '' : value });
  };

  const handlePriceChange = (event) => {
    onChange({ maxPrice: Number(event.target.value) });
  };

  const handleClear = () => {
    onChange({
      busTypes: [],
      departureSlot: '',
      maxPrice,
    });
  };

  return (
    <div className="hidden lg:block bg-white w-80 ml-4 mt-8 min-h-screen border border-gray-200 rounded-2xl shadow-sm overflow-hidden mb-10">
      <div className="flex justify-between items-center p-5">
        <h2 className="font-bold text-gray-700 text-lg">Filters</h2>
        <button type="button" onClick={handleClear} className="text-gray-400 hover:text-orange-500 font-semibold text-sm transition-colors">
          Clear All
        </button>
      </div>

      <div className="w-[90%] mx-auto h-[1px] bg-gray-100" />

      <div className="p-5">
        <h3 className="font-bold text-gray-600 mb-4 text-sm uppercase tracking-wider">Bus Type</h3>
        <div className="grid grid-cols-2 gap-3">
          {busTypeOptions.map((type) => (
            <button
              key={type.value}
              type="button"
              onClick={() => handleBusTypeToggle(type.value)}
              className={`flex flex-col items-center justify-center p-3 border rounded-xl transition-all ${filters.busTypes?.includes(type.value) ? 'border-orange-500 bg-orange-50 text-orange-600' : 'border-gray-100 text-gray-500'}`}
            >
              <div className="mb-2 text-xl">{type.icon}</div>
              <span className="text-[10px] font-bold text-center whitespace-nowrap uppercase">{type.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="p-5">
        <h3 className="font-bold text-gray-600 mb-4 text-sm uppercase tracking-wider">Price Ceiling</h3>
        <input
          type="range"
          min={minPrice}
          max={maxPrice}
          value={sliderValue}
          onChange={handlePriceChange}
          className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
        />
        <div className="flex justify-between mt-3 text-sm font-bold text-gray-700">
          <span>₹{minPrice}</span>
          <span>₹{maxPrice}</span>
        </div>
        <div className="text-center text-orange-600 font-black mt-1">Selected: ₹{sliderValue}</div>
      </div>

      <div className="p-5">
        <h3 className="font-bold text-gray-600 mb-4 text-sm uppercase tracking-wider">Departure Time</h3>
        <div className="grid grid-cols-2 gap-3">
          {timeSlots.map((slot) => (
            <button
              key={slot.value}
              type="button"
              onClick={() => handleSlotToggle(slot.value)}
              className={`flex flex-col items-center justify-center p-3 border rounded-xl transition-all ${filters.departureSlot === slot.value ? 'border-orange-500 bg-orange-50 text-orange-600' : 'border-gray-100 text-gray-500'}`}
            >
              <div className="mb-1 text-lg">{slot.icon}</div>
              <span className="text-[10px] font-bold uppercase text-center">{slot.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="p-5 space-y-3">
        {['Bus Partner', 'Boarding Point', 'Dropping Point'].map((label) => (
          <button key={label} type="button" className="w-full flex justify-between items-center p-4 border border-gray-100 rounded-2xl text-gray-500 font-bold text-sm hover:bg-gray-50">
            {label}
            <FaChevronDown className="text-xs" />
          </button>
        ))}
      </div>
    </div>
  );
};

Leftcard.defaultProps = {
  filters: { busTypes: [], departureSlot: '', maxPrice: 0 },
  priceBounds: { min: 0, max: 2000 },
  onChange: () => {},
};

export default Leftcard;