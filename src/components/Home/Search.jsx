import React, { useEffect, useMemo, useState } from 'react';
import { createSearchParams, useNavigate } from 'react-router-dom';
import { 
  FaBus, 

  FaLocationDot, 

  FaMagnifyingGlass,
  FaArrowRightArrowLeft 
} from "react-icons/fa6";
import { useSearchContext } from '../../context/SearchContext';
import { fetchMetaSummary } from '../../services/busService';

const defaultCities = ['Pune', 'Solapur', 'Mumbai', 'Hyderabad', 'Bangalore', 'Goa', 'Delhi', 'Ahmedabad', 'Chennai', 'Kolhapur'];

const Search = () => {
  const navigate = useNavigate();
  const { criteria, updateCriteria } = useSearchContext();
  const [formState, setFormState] = useState(criteria);
  const [cities, setCities] = useState(defaultCities);
  const [activeField, setActiveField] = useState(null);

  useEffect(() => {
    setFormState(criteria);
  }, [criteria]);

  useEffect(() => {
    fetchMetaSummary()
      .then(summary => {
        const topDest = summary?.topDestinations?.map(item => item._id).filter(Boolean) || [];
        setCities(prev => Array.from(new Set([...prev, ...topDest])));
      })
      .catch(() => {
        // keep defaults on failure
      });
  }, []);

  const today = new Date();
  const minDate = today.toISOString().split('T')[0];
  today.setDate(today.getDate() + 1);
  const tomorrow = today.toISOString().split('T')[0];

  const handleInputChange = event => {
    const { name, value } = event.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSwap = () => {
    setFormState(prev => ({
      ...prev,
      origin: prev.destination,
      destination: prev.origin,
    }));
  };

  const filteredCities = useMemo(() => {
    const source = activeField ? formState[activeField] : '';
    if (!source) return cities;
    const lower = source.toLowerCase();
    return cities.filter(city => city.toLowerCase().startsWith(lower));
  }, [activeField, cities, formState]);

  const handleSuggestionSelect = (field, city) => {
    setFormState(prev => ({ ...prev, [field]: city }));
    setActiveField(null);
  };

  const handleSubmit = event => {
    event.preventDefault();
    updateCriteria(formState);

    navigate({
      pathname: '/s-to-d',
      search: createSearchParams({
        origin: formState.origin,
        destination: formState.destination,
        date: formState.travelDate,
      }).toString(),
    });
  };

  return (
    <div className="relative z-30 w-full px-4 max-w-7xl mx-auto">
      <form
        onSubmit={handleSubmit}
        className="relative z-30 bg-white/90 backdrop-blur-xl rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] p-4 md:p-6 border border-white/50 overflow-visible"
      >
        
        {/* TABS SECTION */}
        <div className="flex items-center justify-between mb-6 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            <button className="flex items-center gap-2 px-6 py-2.5  text-black hover:bg-white rounded-md text-sm font-black whitespace-nowrap transition-all">
              <FaBus /> BUSES
            </button>
      
          </div>
          <p className='hidden lg:block font-extrabold text-black text-xs tracking-widest uppercase'>
            India's Fastest Booking Platform
          </p>
        </div>

        {/* INPUTS GRID */}
        <div className="flex flex-col lg:grid lg:grid-cols-12 bg-slate-50 rounded-3xl lg:rounded-full p-2 border border-slate-200 gap-2 lg:gap-0">
          
          {/* FROM */}
          <div className="lg:col-span-3 flex items-center px-6 py-4 lg:py-3 gap-4 bg-white lg:bg-transparent rounded-2xl lg:rounded-none border-b lg:border-b-0 lg:border-r border-slate-400 relative">
            <FaLocationDot className="text-orange-500 text-xl lg:text-lg" />
            <div className="flex flex-col flex-1">
              <span className="text-[10px] uppercase font-black text-slate-400">From</span>
              <input
                name="origin"
                value={formState.origin}
                onChange={handleInputChange}
                onFocus={() => setActiveField('origin')}
                onBlur={() => setTimeout(() => setActiveField(prev => (prev === 'origin' ? null : prev)), 120)}
                type="text"
                placeholder="Departure City"
                className="bg-transparent font-bold text-slate-800 outline-none w-full text-base placeholder:text-slate-300"
              />
            </div>
            {activeField === 'origin' && filteredCities.length > 0 && (
              <ul className="absolute left-0 right-0 top-full mt-2 bg-white border border-slate-200 rounded-2xl shadow-xl max-h-60 overflow-auto z-[120]">
                {filteredCities.map(city => (
                  <li key={`origin-${city}`}>
                    <button
                      type="button"
                      onMouseDown={() => handleSuggestionSelect('origin', city)}
                      className="w-full text-left px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-orange-50"
                    >
                      {city}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* TO */}
          <div className="lg:col-span-3 flex items-center px-6 py-4 lg:py-3 gap-4 bg-white lg:bg-transparent rounded-2xl lg:rounded-none border-b lg:border-b-0 lg:border-r border-slate-400 relative">
            <FaLocationDot className="text-orange-500 text-xl lg:text-lg" />
            <div className="flex flex-col flex-1">
              <span className="text-[10px] uppercase font-black text-slate-400">To</span>
              <input
                name="destination"
                value={formState.destination}
                onChange={handleInputChange}
                onFocus={() => setActiveField('destination')}
                onBlur={() => setTimeout(() => setActiveField(prev => (prev === 'destination' ? null : prev)), 120)}
                type="text"
                placeholder="Arrival City"
                className="bg-transparent font-bold text-slate-800 outline-none w-full text-base placeholder:text-slate-300"
              />
            </div>
            <button
              type="button"
              aria-label="Swap cities"
              onClick={handleSwap}
              className="absolute -right-3 top-1/2 -translate-y-1/2 bg-white border border-slate-200 rounded-full p-2 shadow-sm hover:bg-orange-50"
            >
              <FaArrowRightArrowLeft className="text-orange-600" />
            </button>
            {activeField === 'destination' && filteredCities.length > 0 && (
              <ul className="absolute left-0 right-0 top-full mt-2 bg-white border border-slate-200 rounded-2xl shadow-xl max-h-60 overflow-auto z-[120]">
                {filteredCities.map(city => (
                  <li key={`destination-${city}`}>
                    <button
                      type="button"
                      onMouseDown={() => handleSuggestionSelect('destination', city)}
                      className="w-full text-left px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-orange-50"
                    >
                      {city}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* DATE & DAY */}
          <div className="lg:col-span-4 flex bg-white lg:bg-transparent rounded-2xl lg:rounded-none overflow-hidden divide-x divide-slate-100 lg:divide-slate-400">
             <label className="flex-1 flex items-center gap-4 px-6 py-4 lg:py-3 group cursor-pointer hover:bg-slate-100/50 transition-all">
               
                <div className="flex flex-col w-full">
                    <span className="text-[10px] uppercase font-black text-slate-400 block">Departure</span>
                    
                    <input
                    
                      type="date"
                      name="travelDate"
                      min={minDate}
                      value={formState.travelDate}
                      onChange={handleInputChange}
                      className="bg-transparent font-bold text-slate-800 text-sm outline-none"
                      
                    />
                </div>
             </label>
             <button
               type="button"
               className="flex-1 flex flex-col justify-center px-6 py-4 lg:py-3 cursor-pointer hover:bg-slate-100/50 transition-all"
               onClick={() => setFormState(prev => ({ ...prev, travelDate: tomorrow }))}
             >
                <span className="text-[10px] uppercase font-black text-slate-400">Quick Select</span>
                <span className="font-bold text-black text-sm">Tomorrow</span>
             </button>
          </div>

          {/* SEARCH BUTTON */}
          <div className="lg:col-span-2 mt-2 lg:mt-0 lg:p-1">
            <button type="submit" className="w-full cursor-pointer py-5 lg:h-full bg-red-600 text-white font-black rounded-2xl lg:rounded-full flex items-center justify-center gap-3 transition-all ">
              <FaMagnifyingGlass className="text-xl group-hover:scale-125 transition-transform" /> 
              <span className="tracking-widest">SEARCH</span>
            </button>
          </div>

        </div>
      </form>
    </div>
  );
};

export default Search;