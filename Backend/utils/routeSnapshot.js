import BusRoute from '../Models/BusRoute.js';

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

export { sanitizeRouteSnapshot, upsertRouteFromSnapshot, buildRouteSnapshot };
