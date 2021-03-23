import mongoose, { Schema, Document } from "mongoose";

interface IBooking {
  startDate: Date,
  endDate: Date
}

interface ICarBooking extends Document {
  _id?: string,
  bookings: IBooking[]
}

const bookingSchema: Schema = new Schema({
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true }
})

const carBookingSchema: Schema = new Schema({
  _id: { type: mongoose.Types.ObjectId, auto: true },
  bookings: { type: [bookingSchema], required: true }
})

const CarBookingModel = mongoose.model<ICarBooking>('car-bookings', carBookingSchema)

export { IBooking, ICarBooking, CarBookingModel }