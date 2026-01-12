import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema(
  {
    route: { type: mongoose.Schema.Types.ObjectId, ref: 'BusRoute', required: true },
    passengerName: { type: String, required: true, trim: true },
    passengerEmail: { type: String, required: true, lowercase: true, trim: true },
    passengerPhone: { type: String, required: true, trim: true },
    seats: { type: Number, required: true, min: 1 },
    travelDate: { type: String, required: true },
    boardingPoint: { type: String, required: true },
    status: {
      type: String,
      enum: ['confirmed', 'pending', 'cancelled'],
      default: 'confirmed',
    },
    totalAmount: { type: Number, required: true },
    reference: { type: String, required: true, unique: true },
    notes: { type: String, trim: true },
    routeSnapshot: {
      routeId: { type: String },
      routeCode: { type: String },
      operatorName: { type: String },
      busType: { type: String },
      originCity: { type: String },
      destinationCity: { type: String },
      departureTime: { type: String },
      arrivalTime: { type: String },
      travelDurationMins: { type: Number },
      fare: { type: Number },
      currency: { type: String },
      boardingPoints: [{ type: String }],
      droppingPoints: [{ type: String }],
      daysOfOperation: [{ type: String }],
      amenities: [{ type: String }],
      heroImage: { type: String },
      externalSource: { type: Boolean },
      totalSeats: { type: Number },
      availableSeats: { type: Number },
    },
  },
  { timestamps: true }
);

bookingSchema.index({ reference: 1 });

bookingSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (_, ret) => {
    ret.id = ret._id;
    delete ret._id;
    return ret;
  },
});

const Booking = mongoose.models.Booking || mongoose.model('Booking', bookingSchema);

export default Booking;
