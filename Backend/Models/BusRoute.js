import mongoose from 'mongoose';

const slotMap = (
  departureMinutes => {
    if (departureMinutes < 600) return 'BEFORE_10_AM';
    if (departureMinutes < 1020) return 'TEN_TO_FIVE_PM';
    if (departureMinutes < 1380) return 'FIVE_TO_ELEVEN_PM';
    return 'AFTER_11_PM';
  }
);

const timeToMinutes = (timeString = '') => {
  const [hours, minutes] = timeString.split(':').map(Number);
  if (Number.isNaN(hours) || Number.isNaN(minutes)) {
    return 0;
  }
  return hours * 60 + minutes;
};

const busRouteSchema = new mongoose.Schema(
  {
    operatorName: { type: String, required: true, trim: true },
    routeCode: { type: String, required: true, unique: true, uppercase: true },
    busType: {
      type: String,
      required: true,
      enum: ['AC Sleeper', 'AC Seater', 'Non AC Sleeper', 'Non AC Seater', 'Electric Luxury'],
    },
    originCity: { type: String, required: true, trim: true },
    destinationCity: { type: String, required: true, trim: true },
    departureTime: { type: String, required: true },
    arrivalTime: { type: String, required: true },
    travelDurationMins: { type: Number, default: 0 },
    fare: { type: Number, required: true },
    currency: { type: String, default: 'INR' },
    availableSeats: { type: Number, required: true },
    totalSeats: { type: Number, required: true },
    rating: { type: Number, default: 4.6 },
    ratingsCount: { type: Number, default: 0 },
    amenities: [{ type: String, trim: true }],
    boardingPoints: [{ type: String, trim: true }],
    droppingPoints: [{ type: String, trim: true }],
    daysOfOperation: {
      type: [String],
      default: ['Daily'],
    },
    highlights: [{ type: String }],
    heroImage: { type: String },
    departureSlot: {
      type: String,
      enum: ['BEFORE_10_AM', 'TEN_TO_FIVE_PM', 'FIVE_TO_ELEVEN_PM', 'AFTER_11_PM'],
      default: 'TEN_TO_FIVE_PM',
    },
    departureMinutes: { type: Number, default: 0 },
    arrivalMinutes: { type: Number, default: 0 },
  },
  { timestamps: true }
);

busRouteSchema.pre('save', function setDerivedFields(next) {
  const departureMinutes = timeToMinutes(this.departureTime);
  const arrivalMinutes = timeToMinutes(this.arrivalTime);

  this.departureMinutes = departureMinutes;
  this.arrivalMinutes = arrivalMinutes;
  this.departureSlot = slotMap(departureMinutes);

  if (!this.travelDurationMins && arrivalMinutes) {
    const rawDuration = arrivalMinutes - departureMinutes;
    this.travelDurationMins = rawDuration > 0 ? rawDuration : (1440 + rawDuration);
  }

  next();
});

busRouteSchema.index({ originCity: 1, destinationCity: 1, departureMinutes: 1 });

busRouteSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (_, ret) => {
    ret.id = ret._id;
    delete ret._id;
    return ret;
  },
});

const BusRoute = mongoose.models.BusRoute || mongoose.model('BusRoute', busRouteSchema);

export default BusRoute;
