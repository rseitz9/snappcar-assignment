import logger from '../logger';
import { CarBookingModel, ICarBooking } from '../models/car';
import mongoose from 'mongoose';

export const bookCar = async (car: ICarBooking) => {
  //TODO: error check
  logger.info('in getPrice')
}

export const isBooked = async (id: string, start: Date, end: Date) => {
  //if car with _id has any record where start is after db.start and start is before db.end OR end is after db.start and before db.end
  id = '6059ccf947ac48016be8b6cd';
  start = new Date('2020-01-01T00:00:00');
  end = new Date('2020-01-01T00:00:00');
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