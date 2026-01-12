import mongoose from 'mongoose';
import Booking from '../Models/Booking.js';
import BusRoute from '../Models/BusRoute.js';
import generateReference from '../utils/generateReference.js';
import dayjs from 'dayjs';

const sanitizeRouteSnapshot = (rawSnapshot = {}) => {
  if (!rawSnapshot || typeof rawSnapshot !== 'object') {
    return null;
  }

  const routeCode = rawSnapshot.routeCode || rawSnapshot.id || `EXT-${Date.now()}`;
  const operatorName = rawSnapshot.operatorName?.trim();
  const originCity = rawSnapshot.originCity?.trim();
  const destinationCity = rawSnapshot.destinationCity?.trim();
  const departureTime = rawSnapshot.departureTime || '00:00';
  const arrivalTime = rawSnapshot.arrivalTime || '00:00';
  const busType = rawSnapshot.busType || 'AC Sleeper';
  const travelDurationMins = Number(rawSnapshot.travelDurationMins ?? 0);
  const fare = Number(rawSnapshot.fare ?? 0);
  const currency = rawSnapshot.currency || 'INR';
  const availableSeats = Number(rawSnapshot.availableSeats ?? rawSnapshot.totalSeats ?? 0);
  const totalSeats = Number(rawSnapshot.totalSeats ?? rawSnapshot.availableSeats ?? 0);

  if (!operatorName || !originCity || !destinationCity || !routeCode || !departureTime || !arrivalTime || totalSeats <= 0) {
    return null;
  }

  const safeArray = value => (Array.isArray(value) ? value.filter(Boolean) : []);

  return {
    operatorName,
    routeCode,
    busType,
    originCity,
    destinationCity,
    departureTime,
    arrivalTime,
    travelDurationMins,
    fare,
    currency,
    availableSeats: availableSeats > 0 ? availableSeats : totalSeats,
    totalSeats: totalSeats > 0 ? totalSeats : availableSeats,
    amenities: safeArray(rawSnapshot.amenities),
    boardingPoints: safeArray(rawSnapshot.boardingPoints).length ? safeArray(rawSnapshot.boardingPoints) : ['Main Boarding Point'],
    droppingPoints: safeArray(rawSnapshot.droppingPoints).length ? safeArray(rawSnapshot.droppingPoints) : ['Primary Drop Point'],
    daysOfOperation: safeArray(rawSnapshot.daysOfOperation).length ? safeArray(rawSnapshot.daysOfOperation) : ['Daily'],
    highlights: safeArray(rawSnapshot.highlights),
    heroImage: rawSnapshot.heroImage,
    rating: Number(rawSnapshot.rating ?? 4.5),
    ratingsCount: Number(rawSnapshot.ratingsCount ?? 0),
  };
};

const upsertRouteFromSnapshot = async snapshot => {
  const payload = sanitizeRouteSnapshot(snapshot);
  if (!payload) {
    return null;
  }

  return BusRoute.findOneAndUpdate(
    { routeCode: payload.routeCode },
    { ...payload, externalSource: true },
    { new: true, upsert: true, setDefaultsOnInsert: true }
  );
};

const buildRouteSnapshot = routeDoc => {
  if (!routeDoc) {
    return null;
  }

  const route = routeDoc.toObject ? routeDoc.toObject() : routeDoc;
  return {
    routeId: route._id?.toString?.(),
    routeCode: route.routeCode,
    operatorName: route.operatorName,
    busType: route.busType,
    originCity: route.originCity,
    destinationCity: route.destinationCity,
    departureTime: route.departureTime,
    arrivalTime: route.arrivalTime,
    travelDurationMins: route.travelDurationMins,
    fare: route.fare,
    currency: route.currency,
    boardingPoints: route.boardingPoints,
    droppingPoints: route.droppingPoints,
    daysOfOperation: route.daysOfOperation,
    amenities: route.amenities,
    heroImage: route.heroImage,
    externalSource: Boolean(route.externalSource),
    totalSeats: route.totalSeats,
    availableSeats: route.availableSeats,
  };
};

export const createBooking = async (req, res, next) => {
  try {
    const {
      routeId,
      routeSnapshot,
      passengerName,
      passengerEmail,
      passengerPhone,
      seats,
      travelDate,
      boardingPoint,
      notes,
    } = req.body;

    const normalizedSeats = Number(seats);
    const normalizedDate = typeof travelDate === 'string' ? travelDate.trim() : '';

    if (!passengerName || !passengerEmail || !passengerPhone || !normalizedSeats || !normalizedDate || !boardingPoint) {
      return res.status(400).json({ message: 'Missing booking details' });
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

    if (currentSeatCount < normalizedSeats) {
      return res.status(400).json({ message: 'Not enough seats available' });
    }

    const totalAmount = normalizedSeats * Number(route.fare ?? 0);
    route.availableSeats = Math.max(currentSeatCount - normalizedSeats, 0);
    await route.save();

    const booking = await Booking.create({
      route: route._id,
      passengerName,
      passengerEmail,
      passengerPhone,
      seats: normalizedSeats,
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
