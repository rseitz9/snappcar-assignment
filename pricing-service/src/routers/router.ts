import { pricingService } from '../services/pricing.service';
import express, { Request, Response } from "express";
import asyncHandler from '../utils/asyncHandler';
import BookingException from '../models/pricing-exception';
import HttpException from '../models/http-exception';
import PricingException from '../models/pricing-exception';

export const pricingRouter = express.Router();

pricingRouter.post('/:id', asyncHandler(async (req: Request, res: Response) => {
  let { basePriceCents } = req.body;
  let id = validateAndParseId(req.params.id)
  basePriceCents = validateAndParsePrice(basePriceCents);
  const { startDate, endDate } = validateAndParseDates(req.body.startDate, req.body.endDate);

  let pricingBreakdown = await pricingService.getPrice(id, basePriceCents, startDate, endDate);
  res.status(200).send(pricingBreakdown);
}))

function validateAndParseId(id: string) {
  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    throw new HttpException(400, "Invalid id");
  }
  return id;
}

function validateAndParsePrice(price: string) {
  let parsed;
  try {
    parsed = Number.parseInt(price, 10);
  } catch (e) {
    throw new PricingException("Could not parse basePriceCents")
  }

  if (parsed < 0) {
    throw new PricingException("basePriceCents must be greater than 0")
  }

  return parsed;
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

  if (startDate > endDate) {
    throw new BookingException("startDate must be before endDate");
  }

  return { startDate, endDate }
}

