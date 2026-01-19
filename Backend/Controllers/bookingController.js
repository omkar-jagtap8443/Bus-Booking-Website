import mongoose from 'mongoose';
import Booking from '../Models/Booking.js';
import BusRoute from '../Models/BusRoute.js';
import generateReference from '../utils/generateReference.js';
import dayjs from 'dayjs';
import { buildRouteSnapshot, upsertRouteFromSnapshot } from '../utils/routeSnapshot.js';
import { normalizeSeatList } from '../utils/seatPlanner.js';

export const createBooking = async (req, res, next) => {
  try {
    const {
      routeId,
      routeSnapshot,
      passengerName,
      passengerEmail,
      passengerPhone,
      seats,
      seatNumbers: rawSeatNumbers,
      selectedSeats,
      travelDate,
      boardingPoint,
      notes,
    } = req.body;

    const normalizedSeatNumbers = normalizeSeatList(
      Array.isArray(rawSeatNumbers) && rawSeatNumbers.length ? rawSeatNumbers : selectedSeats
    );
    const requestedSeats = normalizedSeatNumbers.length || Number(seats);
    const normalizedDate = dayjs(travelDate).isValid()
      ? dayjs(travelDate).format('YYYY-MM-DD')
      : (typeof travelDate === 'string' ? travelDate.trim() : '');

    if (!passengerName || !passengerEmail || !passengerPhone || !requestedSeats || !normalizedDate || !boardingPoint) {
      return res.status(400).json({ message: 'Missing booking details' });
    }

    if (!normalizedSeatNumbers.length) {
      return res.status(400).json({ message: 'Please select at least one seat' });
    }

    if (requestedSeats !== normalizedSeatNumbers.length) {
      return res.status(400).json({ message: 'Seat count does not match selection' });
    }

    let route = null;
    if (routeId && mongoose.isValidObjectId(routeId)) {
      route = await BusRoute.findById(routeId);
    }

    if (!route && routeSnapshot) {
      route = await upsertRouteFromSnapshot(routeSnapshot);
    }

    if (!route) {
      return res.status(404).json({ message: 'Route not found for this booking request' });
    }

    const currentSeatCount = Number(route.availableSeats ?? 0);

    const conflictingSeat = await Booking.findOne({
      route: route._id,
      travelDate: normalizedDate,
      status: { $ne: 'cancelled' },
      seatNumbers: { $in: normalizedSeatNumbers },
    }).lean();

    if (conflictingSeat) {
      return res.status(409).json({ message: 'One or more selected seats are no longer available' });
    }

    if (currentSeatCount < requestedSeats) {
      return res.status(400).json({ message: 'Not enough seats available' });
    }

    const totalAmount = requestedSeats * Number(route.fare ?? 0);
    route.availableSeats = Math.max(currentSeatCount - requestedSeats, 0);
    await route.save();

    const booking = await Booking.create({
      route: route._id,
      passengerName,
      passengerEmail,
      passengerPhone,
      seats: requestedSeats,
      seatNumbers: normalizedSeatNumbers,
      travelDate: normalizedDate,
      boardingPoint,
      notes,
      totalAmount,
      reference: generateReference(),
      routeSnapshot: buildRouteSnapshot(route),
    });

    res.status(201).json(booking);
  } catch (error) {
    next(error);
  }
};

const buildBookingsFilter = query => {
  const filters = {};

  if (query.reference) {
    filters.reference = query.reference.trim().toUpperCase();
  }

  if (query.passengerEmail) {
    filters.passengerEmail = new RegExp(query.passengerEmail.trim(), 'i');
  }

  if (query.passengerPhone) {
    filters.passengerPhone = new RegExp(query.passengerPhone.trim(), 'i');
  }

  if (query.routeId && mongoose.isValidObjectId(query.routeId)) {
    filters.route = query.routeId;
  }

  if (query.travelDate) {
    filters.travelDate = dayjs(query.travelDate).format('YYYY-MM-DD');
  }

  return filters;
};

export const listBookings = async (req, res, next) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const currentPage = Math.max(Number(page) || 1, 1);
    const pageLimit = Math.min(Math.max(Number(limit) || 20, 1), 100);
    const skip = (currentPage - 1) * pageLimit;

    const filters = buildBookingsFilter(req.query);

    const [bookings, total] = await Promise.all([
      Booking.find(filters)
        .populate('route', 'routeCode operatorName originCity destinationCity departureTime arrivalTime')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(pageLimit)
        .lean(),
      Booking.countDocuments(filters),
    ]);

    res.json({
      data: bookings,
      meta: {
        total,
        page: currentPage,
        limit: pageLimit,
      },
    });
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
