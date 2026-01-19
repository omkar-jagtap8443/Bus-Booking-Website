import dayjs from 'dayjs';
import mongoose from 'mongoose';
import BusRoute from '../Models/BusRoute.js';
import Booking from '../Models/Booking.js';
import { fetchExternalRoutes } from '../utils/externalRoutes.js';
import { buildSeatLabels, buildSeatLayout, hydrateReservedSet } from '../utils/seatPlanner.js';
import { upsertRouteFromSnapshot } from '../utils/routeSnapshot.js';

const sortMap = {
  price: { fare: 1 },
  departure: { departureMinutes: 1 },
  arrival: { arrivalMinutes: 1 },
  rating: { rating: -1 },
  seats: { availableSeats: -1 },
};

const normalizeText = value => (value ? value.trim() : '');

const buildFilters = (query) => {
  const filters = {};

  if (query.origin) {
    filters.originCity = new RegExp(`^${normalizeText(query.origin)}`, 'i');
  }

  if (query.destination) {
    filters.destinationCity = new RegExp(`^${normalizeText(query.destination)}`, 'i');
  }

  if (query.busTypes) {
    const busTypes = Array.isArray(query.busTypes)
      ? query.busTypes
      : String(query.busTypes)
          .split(',')
          .map(item => item.trim())
          .filter(Boolean);

    if (busTypes.length) {
      filters.busType = { $in: busTypes };
    }
  }

  if (query.departureSlot) {
    filters.departureSlot = query.departureSlot;
  }

  if (query.minPrice || query.maxPrice) {
    filters.fare = {};
    if (query.minPrice) filters.fare.$gte = Number(query.minPrice);
    if (query.maxPrice) filters.fare.$lte = Number(query.maxPrice);
  }

  if (query.travelDate) {
    const travelDay = dayjs(query.travelDate).format('ddd');
    filters.$or = [
      { daysOfOperation: 'Daily' },
      { daysOfOperation: { $in: [travelDay] } },
    ];
  }

  return filters;
};

export const getRoutes = async (req, res, next) => {
  try {
    const { page = 1, limit = 25, sortBy = 'departure' } = req.query;
    const currentPage = Number(page) || 1;
    const paginationLimit = Math.min(Number(limit) || 25, 50);
    const paginationSkip = (currentPage - 1) * paginationLimit;

    const filters = buildFilters(req.query);
    const sortClause = sortMap[sortBy] || sortMap.departure;

    let dbRoutes = [];
    let dbTotal = 0;
    let dbStats = [];

    try {
      [dbRoutes, dbTotal, dbStats] = await Promise.all([
        BusRoute.find(filters)
          .sort(sortClause)
          .skip(paginationSkip)
          .limit(paginationLimit)
          .lean(),
        BusRoute.countDocuments(filters),
        BusRoute.aggregate([
          { $match: filters },
          {
            $group: {
              _id: null,
              minFare: { $min: '$fare' },
              maxFare: { $max: '$fare' },
              totalSeats: { $sum: '$availableSeats' },
            },
          },
        ]),
      ]);
    } catch (dbError) {
      console.warn('Database unavailable, falling back to external feed:', dbError.message);
    }

    let sanitizedRoutes = (dbRoutes || []).map(route => {
      const formatted = { ...route, id: route._id?.toString() || route.id };
      delete formatted._id;
      return formatted;
    });

    let metaStats = (dbStats && dbStats[0]) || { minFare: 0, maxFare: 0, totalSeats: 0 };
    let total = dbTotal;
    let usedFallback = false;

    if (!sanitizedRoutes.length) {
      try {
        const fallback = await fetchExternalRoutes({
          origin: req.query.origin,
          destination: req.query.destination,
          limit: paginationLimit,
          page: currentPage,
          sortBy,
        });

        sanitizedRoutes = fallback.routes;
        metaStats = fallback.stats;
        total = fallback.total;
        usedFallback = true;
      } catch (fallbackError) {
        console.error('External fallback failed:', fallbackError.message);
      }
    }

    res.json({
      data: sanitizedRoutes,
      meta: {
        total,
        page: currentPage,
        limit: paginationLimit,
        priceRange: {
          min: metaStats.minFare,
          max: metaStats.maxFare,
        },
        totalAvailableSeats: metaStats.totalSeats,
        fallback: usedFallback,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getRouteById = async (req, res, next) => {
  try {
    const route = await BusRoute.findById(req.params.id).lean();

    if (!route) {
      return res.status(404).json({ message: 'Route not found' });
    }

    const formatted = { ...route, id: route._id?.toString() || route.id };
    delete formatted._id;

    res.json(formatted);
  } catch (error) {
    next(error);
  }
};

export const createRoute = async (req, res, next) => {
  try {
    const route = await BusRoute.create(req.body);
    res.status(201).json(route);
  } catch (error) {
    next(error);
  }
};

export const getRouteSeatMap = async (req, res, next) => {
  try {
    const { id: identifier } = req.params;
    const travelDateInput = req.query.travelDate;
    const normalizedDate = dayjs(travelDateInput).isValid()
      ? dayjs(travelDateInput).format('YYYY-MM-DD')
      : null;

    if (!normalizedDate) {
      return res.status(400).json({ message: 'Provide a valid travelDate (YYYY-MM-DD)' });
    }

    let route = null;
    if (mongoose.isValidObjectId(identifier)) {
      route = await BusRoute.findById(identifier).lean();
    }

    if (!route) {
      const normalizedCode = typeof identifier === 'string' ? identifier.toUpperCase() : identifier;
      route = await BusRoute.findOne({ routeCode: normalizedCode }).lean();
    }

    if (!route) {
      return res.status(404).json({ message: 'Route not found' });
    }

    const seatLabels = buildSeatLabels(route.totalSeats);
    const bookings = await Booking.find({
      route: route._id,
      travelDate: normalizedDate,
      status: { $ne: 'cancelled' },
    })
      .select('seatNumbers seats')
      .lean();

    const reservedSet = hydrateReservedSet(bookings, seatLabels);
    const seatMap = buildSeatLayout(seatLabels, reservedSet);
    const total = seatLabels.length;
    const booked = reservedSet.size;

    res.json({
      travelDate: normalizedDate,
      seatMap,
      summary: {
        total,
        booked,
        available: Math.max(total - booked, 0),
      },
    });
  } catch (error) {
    next(error);
  }
};

export const materializeExternalRoute = async (req, res, next) => {
  try {
    const payload = req.body?.routeSnapshot || req.body || {};
    const route = await upsertRouteFromSnapshot(payload);

    if (!route) {
      return res.status(400).json({ message: 'Unable to sync route snapshot' });
    }

    res.json(route.toJSON());
  } catch (error) {
    next(error);
  }
};
