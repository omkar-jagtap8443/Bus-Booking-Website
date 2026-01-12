import Booking from '../Models/Booking.js';
import BusRoute from '../Models/BusRoute.js';
import generateReference from '../utils/generateReference.js';

export const createBooking = async (req, res, next) => {
  try {
    const {
      routeId,
      passengerName,
      passengerEmail,
      passengerPhone,
      seats,
      travelDate,
      boardingPoint,
      notes,
    } = req.body;

    if (!routeId || !passengerName || !passengerEmail || !passengerPhone || !seats || !travelDate || !boardingPoint) {
      return res.status(400).json({ message: 'Missing booking details' });
    }

    const route = await BusRoute.findById(routeId);

    if (!route) {
      return res.status(404).json({ message: 'Route not found' });
    }

    if (route.availableSeats < seats) {
      return res.status(400).json({ message: 'Not enough seats available' });
    }

    const booking = await Booking.create({
      route: routeId,
      passengerName,
      passengerEmail,
      passengerPhone,
      seats,
      travelDate,
      boardingPoint,
      notes,
      totalAmount: seats * route.fare,
      reference: generateReference(),
    });

    route.availableSeats -= seats;
    await route.save();

    res.status(201).json(booking);
  } catch (error) {
    next(error);
  }
};

export const getBookingByReference = async (req, res, next) => {
  try {
    const booking = await Booking.findOne({ reference: req.params.reference })
      .populate('route')
      .lean();

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.json(booking);
  } catch (error) {
    next(error);
  }
};
