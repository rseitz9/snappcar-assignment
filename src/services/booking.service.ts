import logger from '../logger';
import { CarBookingModel, ICarBooking } from '../models/car';

export const bookCar = async (car: ICarBooking) => {
  //TODO: error check
  logger.info('in getPrice')
}

export const isBooked = async (id: string, start: Date, end: Date) => {
  //TODO: error check
  //TODO: make figure
  let car = await CarBookingModel.findOne({
    _id: id, $or: [
      { 'bookings.startDate': { $gte: start.toISOString(), $lte: end.toISOString() } },
      { 'bookings.endDate': { $gte: start.toISOString(), $lte: end.toISOString() } },
      { $and: [{ 'bookings.startDate': { $gte: start.toISOString() } }, { 'bookings.endDate': { $lte: end.toISOString() } }] },
      { $and: [{ 'bookings.startDate': { $lte: start.toISOString() } }, { 'bookings.endDate': { $gte: end.toISOString() } }] }
    ]
  }
  ).exec() as ICarBooking;
  return !!car
}


export const bookingService = { bookCar, isBooked }