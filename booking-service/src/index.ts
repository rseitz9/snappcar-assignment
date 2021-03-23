import express from "express";
import cors from "cors";
import helmet from "helmet";
import logger from "./logger";
import { bookingRouter } from "./routers/router"
import { errorHandler } from "./middleware/error.middleware";
import { notFoundHandler } from "./middleware/not-found.middleware";
import mongoose from 'mongoose';
import loadDemoData from "./loadDbData";

logger.info('starting')

const { PORT, MONGO_CONNECTION_STRING } = process.env;
if (!PORT || !MONGO_CONNECTION_STRING) {
  logger.error('Must specify all env vars');
  process.exit(1);
}

mongoose.connect(MONGO_CONNECTION_STRING, { useNewUrlParser: true })

var db = mongoose.connection
db.on('error', console.error.bind(console, "connection error"))
db.once('open', () => {
  logger.info('connected to mongo');
  loadDemoData();

  const app = express();

  app.use(helmet());
  app.use(cors());
  app.use(express.json());

  app.use("/api/cars", bookingRouter);

  app.use(errorHandler);
  app.use(notFoundHandler);

  app.listen(PORT, () => {
    logger.info(`listening on port ${PORT}`);
  });
})



