import React, { useEffect, useState } from 'react';

const initialState = {
  passengerName: '',
  passengerEmail: '',
  passengerPhone: '',
  seats: 1,
  boardingPoint: '',
  notes: '',
};

const BookingModal = ({ route, travelDate, onClose, onConfirm, isSubmitting }) => {
  const [formState, setFormState] = useState(initialState);

  useEffect(() => {
    if (route) {
      setFormState({
        ...initialState,
        boardingPoint: route.boardingPoints?.[0] || '',
      });
    }
  }, [route]);

  if (!route) {
    return null;
  }

  const handleChange = event => {
    const { name, value } = event.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = event => {
    event.preventDefault();
    onConfirm({
      ...formState,
      seats: Number(formState.seats),
      routeId: route.id,
      travelDate,
    });
  };

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
            Seats
            <input
              type="number"
              min={1}
              max={route.availableSeats}
              name="seats"
              value={formState.seats}
              onChange={handleChange}
              required
              className="border border-slate-200 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
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

          <div className="md:col-span-2 flex flex-col gap-3 border-t border-slate-100 pt-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-500">Total Amount</span>
              <span className="text-2xl font-black text-slate-900">₹{route.fare * formState.seats}</span>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-red-600 text-white font-black rounded-2xl shadow-lg hover:bg-red-700 disabled:opacity-50"
            >
              {isSubmitting ? 'Confirming…' : 'Confirm Booking'}
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
