import { ICarBooking, IBooking, CarBookingModel } from './models/car-booking';
import mongoose from 'mongoose';
//script to load example data if it does not exist for demo purposes

async function loadDemoData() {
  let db = mongoose.connection;
  if (!(await CarBookingModel.findOne({}).exec())) {
    let cars: ICarBooking[] = <any>[
      { bookings: [{ startDate: new Date('2021-01-01T00:00:00'), endDate: new Date('2021-01-03T00:00:00') }, { startDate: new Date('2021-01-05T00:00:00'), endDate: new Date('2021-01-10T00:00:00') }] },
      { bookings: [{ startDate: new Date('2021-01-28T00:00:00'), endDate: new Date('2021-02-01T00:00:00') }] },
      { bookings: [{ startDate: new Date('2021-01-01T00:00:00'), endDate: new Date('2021-02-01T00:00:00') }] }
    ];

    await CarBookingModel.insertMany(cars);
  }
}

export default loadDemoData;