import { bookingService } from '../services/booking.service';
import express, { Request, Response } from "express";
import asyncHandler from '../utils/asyncHandler';
import BookingException from '../models/booking-exception';
import HttpException from '../models/http-exception';
import { isValidObjectId } from 'mongoose';

export const bookingRouter = express.Router();

bookingRouter.post('/', asyncHandler(async (req: Request, res: Response) => {
  let car = await bookingService.createCar();
  res.status(200).send(car);
}))

bookingRouter.get('/:id', asyncHandler(async (req: Request, res: Response) => {
  const id = validateAndParseId(req.params.id);
  let car = await bookingService.getCar(id);
  res.status(200).send(car);
}))


bookingRouter.post('/:id/bookings', asyncHandler(async (req: Request, res: Response) => {
  const id = validateAndParseId(req.params.id);
  const { startDate, endDate } = validateAndParseDates(req.body.startDate, req.body.endDate);
  bookingService.bookCar(id, startDate, endDate);
  res.status(204).send();
}))

bookingRouter.post("/:id/isBooked", asyncHandler(async (req: Request, res: Response) => {
  const id = validateAndParseId(req.params.id);
  const { startDate, endDate } = validateAndParseDates(req.body.startDate, req.body.endDate);

  let result = await bookingService.isBooked(id, startDate, endDate)

  res.status(200).send({ isBooked: result });
}));

function validateAndParseId(id: string) {
  if (!isValidObjectId(id)) {
    throw new HttpException(400, "Invalid id");
  }
  return id;
}

function validateAndParseDates(start: string, end: string) {
  let startDate, endDate;
  try {
    startDate = new Date(start);
  }
  catch (e) {
    throw new HttpException(400, "Could not parse startDate");
  }
  try {
    endDate = new Date(end);
  } catch (e) {
    throw new HttpException(400, "Could not parse endDate");
  }

  if (startDate >= endDate) {
    throw new BookingException("startDate must be before endDate");
  }

  return { startDate, endDate }
}

