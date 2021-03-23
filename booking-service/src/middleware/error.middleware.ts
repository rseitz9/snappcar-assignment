import HttpException from "../models/http-exception";
import { Request, Response, NextFunction } from "express";
import logger from "../logger";

export const errorHandler = (
  error: HttpException,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  logger.error(error.message);
  const status = error.statusCode || error.status || 500;
  response.status(status).send({ message: error.message, statusCode: error.statusCode });
};