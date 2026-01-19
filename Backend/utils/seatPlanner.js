const seatLetters = ['A', 'B', 'C', 'D'];

const buildSeatLabels = (totalSeats = 40) => {
  const safeTotal = Number.isFinite(Number(totalSeats)) && Number(totalSeats) > 0 ? Number(totalSeats) : 40;
  return Array.from({ length: safeTotal }, (_, index) => {
    const row = Math.floor(index / seatLetters.length) + 1;
    const letter = seatLetters[index % seatLetters.length];
    return `${row}${letter}`;
  });
};

const normalizeSeatList = seats => {
  if (!Array.isArray(seats)) {
    return [];
  }

  const unique = new Set();
  const normalized = [];

  seats.forEach(seat => {
    const label = String(seat).trim().toUpperCase();
    if (!label || unique.has(label)) {
      return;
    }
    unique.add(label);
    normalized.push(label);
  });

  return normalized;
};

const hydrateReservedSet = (bookings = [], seatLabels = []) => {
  const reserved = new Set();

  bookings.forEach(booking => {
    const explicitSeats = Array.isArray(booking.seatNumbers) ? booking.seatNumbers : [];

    if (explicitSeats.length) {
      explicitSeats.forEach(seat => {
        if (seat) {
          reserved.add(String(seat).trim().toUpperCase());
        }
      });
      return;
    }

    let seatsToFill = Number(booking.seats) || 0;
    for (const seat of seatLabels) {
      if (!reserved.has(seat) && seatsToFill > 0) {
        reserved.add(seat);
        seatsToFill -= 1;
      }
      if (!seatsToFill) {
        break;
      }
    }
  });

  return reserved;
};

const allocateSeatsFromPool = ({ seatLabels = [], reservedSet = new Set(), count = 1 }) => {
  if (!count) {
    return [];
  }

  const available = [];
  for (const seat of seatLabels) {
    if (!reservedSet.has(seat)) {
      available.push(seat);
    }
    if (available.length === count) {
      break;
    }
  }
  return available;
};

const buildSeatLayout = (seatLabels = [], reservedSet = new Set()) =>
  seatLabels.map((id, index) => ({
    id,
    row: Math.floor(index / seatLetters.length) + 1,
    column: seatLetters[index % seatLetters.length],
    status: reservedSet.has(id) ? 'booked' : 'available',
  }));

export { buildSeatLabels, normalizeSeatList, hydrateReservedSet, allocateSeatsFromPool, buildSeatLayout };
