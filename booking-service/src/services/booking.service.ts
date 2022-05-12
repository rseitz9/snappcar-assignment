import logger from '../logger';
import BookingException from '../models/booking-exception';
import { CarBookingModel, IBooking, ICarBooking } from '../models/car-booking';

const getCar = async (_id: string): Promise<ICarBooking> => {
  return await CarBookingModel.findOne({ _id }).exec();
}

const createCar = async (bookings: IBooking[] = []): Promise<ICarBooking> => {
  return await CarBookingModel.create({ bookings })
}

const bookCar = async (id: string, start: Date, end: Date) => {
  let car = await getCarIfNotBooked(id, start, end);

  if (!car) {
    throw new BookingException('Car is booked for selected dates.')
  }
  else {
    try {
      car.bookings = [...car.bookings, { startDate: start, endDate: end }];
      await car.save();
    }
    catch (e) {
      logger.error(`cannot book car, received error: ${e}`)
      throw new BookingException('Cannot book car, please try again')
    }
  }
}

const isBooked = async (id: string, start: Date, end: Date): Promise<boolean> => {
  try {
    let car = await getCarIfNotBooked(id, start, end);
    return !car
  } catch (e) {
    logger.error(`cannot lookup dates, received error: ${e}`)
    throw new BookingException('Cannot lookup dates')
  }
}

const getCarIfNotBooked = async (id: string, start: Date, end: Date): Promise<ICarBooking> => {
  let car = await CarBookingModel.findOne({
    _id: id, $nor: [
      { 'bookings.startDate': { $gte: start.toISOString(), $lte: end.toISOString() } },
      { 'bookings.endDate': { $gte: start.toISOString(), $lte: end.toISOString() } },
      { $and: [{ 'bookings.startDate': { $gte: start.toISOString() } }, { 'bookings.endDate': { $lte: end.toISOString() } }] },
      { $and: [{ 'bookings.startDate': { $lte: start.toISOString() } }, { 'bookings.endDate': { $gte: end.toISOString() } }] }
    ]
  }
  ).exec();
  return car;
}


export const bookingService = { getCar, bookCar, isBooked, createCar }