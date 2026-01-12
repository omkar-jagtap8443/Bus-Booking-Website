import BusRoute from '../Models/BusRoute.js';
import Booking from '../Models/Booking.js';

export const getSummary = async (req, res, next) => {
  try {
    const [routeCount, bookingCount, seatStats, topDestinations] = await Promise.all([
      BusRoute.countDocuments(),
      Booking.countDocuments(),
      BusRoute.aggregate([
        {
          $group: {
            _id: null,
            totalSeats: { $sum: '$totalSeats' },
            availableSeats: { $sum: '$availableSeats' },
            minFare: { $min: '$fare' },
            maxFare: { $max: '$fare' },
          },
        },
      ]),
      BusRoute.aggregate([
        {
          $group: {
            _id: '$destinationCity',
            count: { $sum: 1 },
          },
        },
        { $sort: { count: -1 } },
        { $limit: 5 },
      ]),
    ]);

    const seatSummary = seatStats[0] || { totalSeats: 0, availableSeats: 0, minFare: 0, maxFare: 0 };

    res.json({
      routes: routeCount,
      bookings: bookingCount,
      seats: seatSummary,
      topDestinations,
    });
  } catch (error) {
    next(error);
  }
};
