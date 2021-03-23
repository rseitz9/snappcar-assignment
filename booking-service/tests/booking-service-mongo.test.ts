import { bookingService } from '../src/services/booking.service';
import { isValidObjectId } from 'mongoose';
import { CarBookingModel } from '../src/models/car-booking';
import { connect, closeDatabase, clearDatabase } from './test-utils';

let carId: string,
  startDate = new Date('2021-01-15T00:00:00'),
  endDate = new Date('2021-01-20T00:00:00');

beforeAll(async () => {
  await connect();
});

afterAll(async () => {
  closeDatabase();
})

beforeEach(async () => {
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
})

afterEach(async () => {
  clearDatabase();
})

describe('booking-service', () => {

  describe('isBooked:', () => {
    it('should return true when endDate overlaps existing booking', async () => {
      let result = await bookingService.isBooked(
        carId,
        new Date('2021-01-01T00:00:00'),
        new Date('2021-01-16T00:00:00')
      );
      expect(result).toBe(true);
    });

    it('should return true when startDate overlaps existing booking', async () => {
      let result = await bookingService.isBooked(
        carId,
        new Date('2021-01-16T00:00:00'),
        new Date('2021-01-25T00:00:00')
      );
      expect(result).toBe(true);
    });

    it('should return true when start and end overlap existing booking', async () => {
      let result = await bookingService.isBooked(
        carId,
        new Date('2021-01-16T00:00:00'),
        new Date('2021-01-19T00:00:00')
      );
      expect(result).toBe(true);
    });

    it('should return true when start and end are equal to booking', async () => {
      let result = await bookingService.isBooked(carId, startDate, endDate);
      expect(result).toBe(true);
    });

    it('should return false with valid booking date', async () => {
      let result = await bookingService.isBooked(
        carId,
        new Date('2021-01-01T00:00:00'),
        new Date('2021-01-02T00:00:00')
      );
      expect(result).toBe(false);
    });
  })

  describe('bookCar', () => {
    it('should not book the car if the date is unavailable', async () => {
      await expect(bookingService.bookCar(carId, startDate, endDate)).rejects.toThrow('Car is booked for selected dates.');
    })

    it('should book the car if the date is available', async () => {
      await expect(bookingService.bookCar(carId, new Date('2021-01-01T00:00:00'), new Date('2021-01-02T00:00:00'))).resolves.not.toThrow();
    })
  })


  describe('createCar', () => {
    it('should create a new car', async () => {
      let car = await bookingService.createCar();
      expect(isValidObjectId(car._id)).toBe(true);
    })
  })

  describe('getCar', () => {
    it('should return the car by id', async () => {
      let car = await bookingService.getCar(carId);
      expect(car).not.toBeNull();
    })
  })

});
