import React, { useState } from 'react';

const formatCity = value => (value ? value.toUpperCase() : '—');
const formatTravelDate = value => {
  if (!value) {
    return '—';
  }
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return value;
  }
  return new Intl.DateTimeFormat('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }).format(parsed);
};

const TicketCard = ({ booking, onDismiss }) => {
  const [copied, setCopied] = useState(false);

  if (!booking) {
    return null;
  }

  const routeInfo = booking.routeSnapshot || booking.route || {};
  const seats = booking.seatNumbers?.length ? booking.seatNumbers : [];

  const travelDate = formatTravelDate(booking.travelDate);

  const handleCopy = async () => {
    try {
      await navigator.clipboard?.writeText?.(booking.reference);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.warn('Clipboard unavailable', error);
    }
  };

  const handleDownload = () => {
    window.print();
  };

  return (
    <div className="bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden">
      <div className="bg-gradient-to-r from-red-600 to-orange-500 text-white px-6 py-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-white/80">Booking Reference</p>
          <p className="text-3xl font-black tracking-wide">{booking.reference}</p>
        </div>
        <div className="text-right">
          <p className="text-xs uppercase tracking-[0.3em] text-white/80">Travel Date</p>
          <p className="text-2xl font-semibold">{travelDate}</p>
        </div>
      </div>

      <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6 text-slate-800">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Route</p>
          <div className="mt-2 flex items-center gap-3">
            <div>
              <p className="text-3xl font-black">{routeInfo.departureTime}</p>
              <p className="text-sm text-slate-500">{formatCity(routeInfo.originCity)}</p>
            </div>
            <span className="flex-1 h-px bg-slate-200" />
            <div className="text-right">
              <p className="text-3xl font-black">{routeInfo.arrivalTime}</p>
              <p className="text-sm text-slate-500">{formatCity(routeInfo.destinationCity)}</p>
            </div>
          </div>
          <p className="mt-3 text-sm font-semibold text-slate-500">Operator • {routeInfo.operatorName}</p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Passenger</p>
          <p className="mt-2 text-xl font-black">{booking.passengerName}</p>
          <div className="mt-3 space-y-1 text-sm text-slate-500">
            <p>{booking.passengerEmail}</p>
            <p>{booking.passengerPhone}</p>
            <p>Boarding: {booking.boardingPoint}</p>
          </div>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Seats & Fare</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {seats.length ? (
              seats.map(seat => (
                <span key={seat} className="inline-flex items-center px-3 py-1 rounded-full bg-red-50 text-red-600 text-sm font-semibold">
                  {seat}
                </span>
              ))
            ) : (
              <span className="text-sm text-slate-500">Seat allocation pending</span>
            )}
          </div>
          <p className="mt-4 text-3xl font-black text-slate-900">₹{booking.totalAmount}</p>
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Status • {booking.status?.toUpperCase()}</p>
        </div>
      </div>

      <div className="border-t border-dashed border-slate-200 px-6 py-4 flex flex-wrap items-center gap-3 justify-between">
        <button
          type="button"
          onClick={handleCopy}
          className="px-4 py-2 rounded-full border border-slate-300 text-sm font-semibold text-slate-600 hover:border-slate-500"
        >
          {copied ? 'Reference Copied' : 'Copy Reference'}
        </button>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={handleDownload}
            className="px-4 py-2 rounded-full bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800"
          >
            Download Ticket
          </button>
          <button
            type="button"
            onClick={onDismiss}
            className="px-4 py-2 rounded-full border border-slate-300 text-sm font-semibold text-slate-600 hover:border-slate-500"
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
};

TicketCard.defaultProps = {
  booking: null,
  onDismiss: () => {},
};

export default TicketCard;
