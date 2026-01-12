import React from 'react';
import { FaStar, FaLocationDot, FaWifi, FaBoltLightning, FaBottleWater } from 'react-icons/fa6';

const formatDuration = (minutes = 0) => {
  const hrs = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hrs}h ${mins.toString().padStart(2, '0')}m`;
};

const amenityIcons = {
  wifi: <FaWifi />,
  'WiFi': <FaWifi />,
  'Live Tracking': <FaBoltLightning />,
  Blanket: <FaBottleWater />,
  'Water Bottle': <FaBottleWater />,
};

const BusResultCard = ({ route, onBook }) => {
  const ratingValue = Number(route.rating ?? 4.5).toFixed(1);
  const ratingCount = route.ratingsCount ? route.ratingsCount.toLocaleString() : '0';

  return (
  <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm hover:shadow-xl transition-shadow">
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <div className="flex items-center gap-3">
          <h3 className="text-2xl font-bold text-slate-900">{route.operatorName}</h3>
          <span className="inline-flex items-center gap-1 text-sm font-semibold text-amber-600 bg-amber-50 px-3 py-1 rounded-full">
            <FaStar /> {ratingValue} ({ratingCount} reviews)
          </span>
        </div>
        <p className="text-sm uppercase tracking-wide text-slate-500 mt-1">{route.busType}</p>
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-3xl font-black text-slate-900">₹{route.fare}</span>
        <span className="text-sm text-slate-500">per seat</span>
      </div>
    </div>

    <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
      <div>
        <p className="text-xs uppercase tracking-widest text-slate-500">Departure</p>
        <p className="text-2xl font-black text-slate-900">{route.departureTime}</p>
        <p className="text-sm text-slate-400">{route.originCity}</p>
      </div>
      <div className="flex flex-col items-center justify-center">
        <p className="text-xs uppercase tracking-widest text-slate-500">Duration</p>
        <p className="text-lg font-semibold text-slate-800">{formatDuration(route.travelDurationMins)}</p>
        <span className="text-3xl">•••</span>
      </div>
      <div>
        <p className="text-xs uppercase tracking-widest text-slate-500">Arrival</p>
        <p className="text-2xl font-black text-slate-900">{route.arrivalTime}</p>
        <p className="text-sm text-slate-400">{route.destinationCity}</p>
      </div>
      <div className="flex flex-col justify-center bg-orange-50 rounded-2xl p-4">
        <p className="text-xs uppercase tracking-widest text-orange-500">Seats Left</p>
        <p className="text-3xl font-black text-orange-600">{route.availableSeats}</p>
        <p className="text-sm text-orange-500">out of {route.totalSeats}</p>
      </div>
    </div>

    <div className="mt-5 flex flex-wrap gap-3">
      {route.amenities?.slice(0, 4).map(item => (
        <span key={item} className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-slate-200 text-sm text-slate-600">
          {amenityIcons[item] || <FaLocationDot className="text-slate-300" />}
          {item}
        </span>
      ))}
    </div>

    <div className="mt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div className="flex flex-wrap gap-2 text-sm text-slate-500">
        {route.boardingPoints?.map(point => (
          <span key={point} className="inline-flex items-center gap-1 px-3 py-1 bg-slate-100 rounded-full">
            <FaLocationDot className="text-orange-500" /> {point}
          </span>
        ))}
      </div>
      <button
        type="button"
        onClick={() => onBook(route)}
        className="px-6 py-3 bg-red-600 text-white font-black rounded-2xl shadow-md hover:bg-red-700"
      >
        Book Seats
      </button>
    </div>
  </div>
);
};

BusResultCard.defaultProps = {
  route: {},
  onBook: () => {},
};

export default BusResultCard;
