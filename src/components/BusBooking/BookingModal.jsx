import React, { useEffect, useMemo, useState } from 'react';
import { fetchRouteSeatMap, syncExternalRoute } from '../../services/busService';

const initialState = {
  passengerName: '',
  passengerEmail: '',
  passengerPhone: '',
  boardingPoint: '',
  notes: '',
};

const buildDefaultSeatState = () => ({
  seatMap: [],
  summary: { total: 0, booked: 0, available: 0 },
});

const MAX_SELECTABLE_SEATS = 6;

const looksLikeObjectId = value => typeof value === 'string' && /^[0-9a-fA-F]{24}$/.test(value);

const buildExternalSnapshot = route => {
  if (!route?.externalSource) {
    return undefined;
  }

  const {
    id,
    _id,
    externalSource,
    ...rest
  } = route;

  return {
    ...rest,
    routeCode: route.routeCode,
    travelDurationMins: route.travelDurationMins,
    availableSeats: route.availableSeats,
    totalSeats: route.totalSeats,
    departureMinutes: route.departureMinutes,
    arrivalMinutes: route.arrivalMinutes,
    externalSource: true,
  };
};

const BookingModal = ({ route, travelDate, onClose, onConfirm, isSubmitting }) => {
  const [formState, setFormState] = useState(initialState);
  const [seatState, setSeatState] = useState(buildDefaultSeatState);
  const [seatLoading, setSeatLoading] = useState(false);
  const [seatError, setSeatError] = useState('');
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [persistedRouteId, setPersistedRouteId] = useState('');

  useEffect(() => {
    if (route) {
      setFormState({
        ...initialState,
        boardingPoint: route.boardingPoints?.[0] || '',
      });
      setSeatState(buildDefaultSeatState());
      setSeatError('');
      setSelectedSeats([]);
      setPersistedRouteId(route.id || '');
    }
  }, [route]);

  useEffect(() => {
    let isMounted = true;
    const loadSeatState = async () => {
      if (!route || !travelDate) {
        return;
      }

      setSelectedSeats([]);
      setSeatLoading(true);
      setSeatError('');

      try {
        let identifier = route.id;
        if (route.externalSource && !looksLikeObjectId(identifier)) {
          const syncedRoute = await syncExternalRoute(buildExternalSnapshot(route));
          identifier = syncedRoute?.id || syncedRoute?._id;
          if (isMounted) {
            setPersistedRouteId(identifier || '');
          }
        }

        const targetIdentifier = identifier || route.routeCode;
        if (!targetIdentifier) {
          throw new Error('Missing route identifier for seat map');
        }

        const payload = await fetchRouteSeatMap(targetIdentifier, { travelDate });
        if (isMounted) {
          setSeatState({
            seatMap: payload.seatMap || [],
            summary: payload.summary || { total: 0, booked: 0, available: 0 },
          });
        }
      } catch (error) {
        if (isMounted) {
          setSeatState(buildDefaultSeatState());
          setSeatError(error.message);
        }
      } finally {
        if (isMounted) {
          setSeatLoading(false);
        }
      }
    };

    loadSeatState();

    return () => {
      isMounted = false;
    };
  }, [route, travelDate]);

  if (!route) {
    return null;
  }

  const handleChange = event => {
    const { name, value } = event.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSeatToggle = seatId => {
    const normalizedSeatId = String(seatId).toUpperCase();
    setSelectedSeats(prev => {
      if (prev.includes(normalizedSeatId)) {
        return prev.filter(id => id !== normalizedSeatId);
      }
      if (prev.length >= MAX_SELECTABLE_SEATS) {
        return prev;
      }
      return [...prev, normalizedSeatId];
    });
    setSeatError('');
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (!selectedSeats.length) {
      setSeatError('Select at least one seat to continue');
      return;
    }

    onConfirm({
      ...formState,
      seats: selectedSeats.length,
      seatNumbers: selectedSeats,
      routeId: persistedRouteId || route.id,
      travelDate,
      routeSnapshot: buildExternalSnapshot(route),
    });
  };

  const seatSummary = seatState.summary;
  const totalAmount = useMemo(() => {
    if (!selectedSeats.length) {
      return route.fare;
    }
    return Number(route.fare ?? 0) * selectedSeats.length;
  }, [route.fare, selectedSeats.length]);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-3xl w-full max-w-2xl p-8 shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <div>
            <p className="text-xs uppercase tracking-widest text-slate-400">Booking</p>
            <h2 className="text-2xl font-black text-slate-900">{route.operatorName}</h2>
            <p className="text-sm text-slate-500">{route.originCity} → {route.destinationCity} on {travelDate}</p>
          </div>
          <button type="button" onClick={onClose} className="text-sm font-bold text-slate-400 hover:text-slate-600">Close</button>
        </div>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleSubmit}>
          <label className="flex flex-col gap-2 text-sm font-semibold text-slate-600">
            Passenger Name
            <input
              name="passengerName"
              value={formState.passengerName}
              onChange={handleChange}
              required
              className="border border-slate-200 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Full Name"
            />
          </label>
          <label className="flex flex-col gap-2 text-sm font-semibold text-slate-600">
            Email Address
            <input
              type="email"
              name="passengerEmail"
              value={formState.passengerEmail}
              onChange={handleChange}
              required
              className="border border-slate-200 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="you@example.com"
            />
          </label>
          <label className="flex flex-col gap-2 text-sm font-semibold text-slate-600">
            Phone Number
            <input
              name="passengerPhone"
              value={formState.passengerPhone}
              onChange={handleChange}
              required
              className="border border-slate-200 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="9999999999"
            />
          </label>
          <label className="flex flex-col gap-2 text-sm font-semibold text-slate-600">
            Boarding Point
            <select
              name="boardingPoint"
              value={formState.boardingPoint}
              onChange={handleChange}
              className="border border-slate-200 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              {route.boardingPoints?.map(point => (
                <option key={point} value={point}>{point}</option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-2 text-sm font-semibold text-slate-600">
            Notes (optional)
            <textarea
              name="notes"
              value={formState.notes}
              onChange={handleChange}
              className="border border-slate-200 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
              rows={3}
            />
          </label>

          <div className="md:col-span-2 flex flex-col gap-4 bg-slate-50/60 border border-slate-100 rounded-2xl p-4">
            <div className="flex flex-wrap gap-4 text-sm font-semibold text-slate-600">
              <span>Available: <span className="text-green-600">{seatSummary.available}</span></span>
              <span>Booked: <span className="text-orange-600">{seatSummary.booked}</span></span>
              <span>Total: {seatSummary.total}</span>
            </div>
            {seatError && (
              <p className="text-sm text-red-600 font-semibold">{seatError}</p>
            )}
            <div className="min-h-[140px]">
              {seatLoading ? (
                <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
                  {Array.from({ length: 20 }).map((_, index) => (
                    <div key={index} className="h-10 rounded-xl bg-slate-200 animate-pulse" />
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
                  {seatState.seatMap.map(seat => {
                    const isSelected = selectedSeats.includes(seat.id);
                    const isBooked = seat.status !== 'available';
                    const baseClasses = 'h-10 rounded-xl font-bold text-sm transition-colors flex items-center justify-center';
                    const stateClasses = isSelected
                      ? 'bg-red-600 text-white shadow-lg'
                      : isBooked
                        ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                        : 'bg-white text-slate-800 border border-slate-200 hover:border-red-500';
                    return (
                      <button
                        key={seat.id}
                        type="button"
                        disabled={isBooked}
                        onClick={() => handleSeatToggle(seat.id)}
                        className={`${baseClasses} ${stateClasses}`}
                      >
                        {seat.id}
                      </button>
                    );
                  })}
                  {!seatState.seatMap.length && !seatError && (
                    <p className="col-span-full text-center text-sm text-slate-500">No seat layout available for this route.</p>
                  )}
                </div>
              )}
            </div>
            <div className="flex flex-wrap gap-2 text-sm">
              {selectedSeats.length ? (
                selectedSeats.map(seat => (
                  <span key={seat} className="inline-flex items-center gap-2 px-3 py-1 bg-red-50 text-red-600 rounded-full">
                    {seat}
                  </span>
                ))
              ) : (
                <span className="text-slate-500">No seats selected yet.</span>
              )}
            </div>
            {selectedSeats.length >= MAX_SELECTABLE_SEATS && (
              <p className="text-xs text-orange-600 font-semibold">
                You can select up to {MAX_SELECTABLE_SEATS} seats per booking.
              </p>
            )}
            <div className="flex items-center gap-6 text-xs text-slate-500">
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded bg-white border border-slate-300" /> Available
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded bg-slate-200" /> Booked
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded bg-red-600" /> Selected
              </div>
            </div>
          </div>

          <div className="md:col-span-2 flex flex-col gap-3 border-t border-slate-100 pt-4">
            {route.externalSource && (
              <p className="text-xs text-orange-600 font-semibold">
                Live data route &mdash; we will secure seats and sync this coach with our database automatically.
              </p>
            )}
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-500">Total Amount</span>
              <span className="text-2xl font-black text-slate-900">₹{totalAmount}</span>
            </div>
            <button
              type="submit"
              disabled={isSubmitting || !selectedSeats.length}
              className="w-full py-4 bg-red-600 text-white font-black rounded-2xl shadow-lg hover:bg-red-700 disabled:opacity-50"
            >
              {isSubmitting ? 'Confirming…' : selectedSeats.length ? `Confirm ${selectedSeats.length} Seat${selectedSeats.length > 1 ? 's' : ''}` : 'Select Seats'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

BookingModal.defaultProps = {
  route: null,
  travelDate: '',
  onClose: () => {},
  onConfirm: () => {},
  isSubmitting: false,
};

export default BookingModal;
