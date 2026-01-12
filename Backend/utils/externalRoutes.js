import fetch from 'node-fetch';

const FALLBACK_API = 'https://dummyjson.com/users?limit=50';

const busTypes = ['AC Sleeper', 'AC Seater', 'Non AC Sleeper', 'Non AC Seater', 'Electric Luxury'];
const amenitiesPreset = ['WiFi', 'Blanket', 'Water Bottle', 'Entertainment', 'Charging Point'];

const pad = value => String(value).padStart(2, '0');

const minutesToTime = minutes => `${pad(Math.floor(minutes / 60) % 24)}:${pad(minutes % 60)}`;

const slotFromMinutes = minutes => {
  if (minutes < 600) return 'BEFORE_10_AM';
  if (minutes < 1020) return 'TEN_TO_FIVE_PM';
  if (minutes < 1380) return 'FIVE_TO_ELEVEN_PM';
  return 'AFTER_11_PM';
};

const normalizeString = value => (value ? value.trim().toLowerCase() : '');

const buildRouteFromUser = (user, index, origin, destination) => {
  const departureMinutes = 360 + (index * 45) % 1080; // between 6:00 and 23:00
  const duration = 240 + (index % 5) * 30; // 4h to 6.5h
  const arrivalMinutes = (departureMinutes + duration) % 1440;

  const originCity = origin || user?.address?.city || 'Pune';
  const destinationCity = destination || user?.company?.address?.city || user?.address?.city || 'Solapur';

  return {
    id: `external-${user.id}-${index}`,
    operatorName: `${user.company?.name || 'Raj Mudra'} Travels`,
    routeCode: `EXT-${user.id}-${index}`,
    busType: busTypes[index % busTypes.length],
    originCity,
    destinationCity,
    departureTime: minutesToTime(departureMinutes),
    arrivalTime: minutesToTime(arrivalMinutes),
    travelDurationMins: duration,
    fare: 699 + (index % 6) * 150,
    currency: 'INR',
    availableSeats: 12 + (index % 10) * 2,
    totalSeats: 40,
    rating: 4 + (index % 5) * 0.1,
    ratingsCount: 200 + index * 17,
    amenities: amenitiesPreset.slice(0, 3 + (index % 3)),
    boardingPoints: [`${originCity} Main Terminal`, `${originCity} Pickup Hub`],
    droppingPoints: [`${destinationCity} Central`, `${destinationCity} City Gate`],
    daysOfOperation: ['Daily'],
    highlights: ['Live data sourced externally'],
    heroImage: user.image,
    departureSlot: slotFromMinutes(departureMinutes),
    departureMinutes,
    arrivalMinutes,
    externalSource: true,
  };
};

const sortFallback = (routes, sortBy) => {
  const map = {
    price: (a, b) => a.fare - b.fare,
    seats: (a, b) => b.availableSeats - a.availableSeats,
    rating: (a, b) => b.rating - a.rating,
    arrival: (a, b) => a.arrivalMinutes - b.arrivalMinutes,
    departure: (a, b) => a.departureMinutes - b.departureMinutes,
  };
  const comparer = map[sortBy] || map.departure;
  return routes.sort(comparer);
};

export const fetchExternalRoutes = async ({ origin, destination, limit = 25, page = 1, sortBy = 'departure' }) => {
  const response = await fetch(FALLBACK_API);
  if (!response.ok) {
    throw new Error('Unable to fetch fallback routes');
  }

  const payload = await response.json();
  const users = payload?.users || payload || [];
  const normalizedOrigin = normalizeString(origin);
  const normalizedDestination = normalizeString(destination);

  const mappedRoutes = users.map((user, index) => buildRouteFromUser(user, index, origin, destination));

  const filteredRoutes = mappedRoutes.filter(route => {
    const originMatch = normalizedOrigin
      ? normalizeString(route.originCity).startsWith(normalizedOrigin)
      : true;
    const destinationMatch = normalizedDestination
      ? normalizeString(route.destinationCity).startsWith(normalizedDestination)
      : true;
    return originMatch && destinationMatch;
  });

  const sortedRoutes = sortFallback(filteredRoutes, sortBy);
  const start = (page - 1) * limit;
  const pageRoutes = sortedRoutes.slice(start, start + limit);

  const fares = pageRoutes.map(route => route.fare);
  const totalAvailableSeats = pageRoutes.reduce((acc, route) => acc + route.availableSeats, 0);

  return {
    routes: pageRoutes,
    stats: {
      minFare: fares.length ? Math.min(...fares) : 0,
      maxFare: fares.length ? Math.max(...fares) : 0,
      totalSeats: totalAvailableSeats,
    },
    total: filteredRoutes.length,
  };
};
