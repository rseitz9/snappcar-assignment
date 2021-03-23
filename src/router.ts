import { bookingService } from './services/booking.service';
import express, { Request, Response } from "express";

export const bookingRouter = express.Router();

bookingRouter.get("/:id", async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);

  // try {
  await bookingService.bookCar({ _id: "some id" })

  res.status(200).send();
  // } catch (e) {
  //   res.status(500).send(e.message);
  // }
});