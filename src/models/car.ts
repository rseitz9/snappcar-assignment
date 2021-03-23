import mongoose, { Schema, Document, Model } from "mongoose";

interface IBooking {
  startDate: Date,
  endDate: Date
}

interface ICarBooking {
  _id?: string,
  bookings?: IBooking[]
}

const bookingSchema: Schema = new Schema({
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true }
})

const carBookingSchema: Schema = new Schema({
  _id: { type: mongoose.Types.ObjectId, auto: true },
  bookings: [bookingSchema]
})

const CarBookingModel = mongoose.model('car-bookings', carBookingSchema)

export { IBooking, ICarBooking, CarBookingModel }