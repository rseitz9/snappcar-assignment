import { bookingService } from 'src/services/booking.service';
import mongoose from 'mongoose';
import { CarBookingModel } from 'src/models/car';
import { MongoMemoryServer } from 'mongodb-memory-server';

let carId: string,
  startDate = new Date('2021-01-15T00:00:00'),
  endDate = new Date('2021-01-20T00:00:00');

beforeAll(async () => {
  const mongod = new MongoMemoryServer();
  let baseUrl = process.env.MONGO_CONNECTION_STRING;
  const uri = await mongod.getUri();

  const mongooseOpts = {
    useNewUrlParser: true,
    autoReconnect: true,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 1000,
  };

  await mongoose.connect(uri, mongooseOpts);
  carId = (
    await CarBookingModel.create({
      bookings: [
        {
          startDate,
          endDate,
        },
      ],
    })
  )._id;
});

describe('booking-service', () => {
  it('isBooked: should return true when endDate overlaps existing booking', async () => {
    let result = await bookingService.isBooked(
      carId,
      new Date('2021-01-01T00:00:00'),
      new Date('2021-01-16T00:00:00')
    );
    expect(result).toBe(true);
  });

  it('isBooked: should return true when startDate overlaps existing booking', async () => {
    let result = await bookingService.isBooked(
      carId,
      new Date('2021-01-16T00:00:00'),
      new Date('2021-01-25T00:00:00')
    );
    expect(result).toBe(true);
  });

  it('isBooked: should return true when start and end overlap existing booking', async () => {
    let result = await bookingService.isBooked(
      carId,
      new Date('2021-01-16T00:00:00'),
      new Date('2021-01-19T00:00:00')
    );
    expect(result).toBe(true);
  });

  it('isBooked: should return true when start and end are equal to booking', async () => {
    let result = await bookingService.isBooked(carId, startDate, endDate);
    expect(result).toBe(true);
  });

  it('isBooked: should return false with valid booking date', async () => {
    let result = await bookingService.isBooked(
      carId,
      new Date('2021-01-01T00:00:00'),
      new Date('2021-01-02T00:00:00')
    );
    expect(result).toBe(false);
  });
});
