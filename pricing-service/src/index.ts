import express from "express";
import cors from "cors";
import helmet from "helmet";
import logger from "./logger";
import { pricingRouter } from "./routers/router"
import { errorHandler } from "./middleware/error.middleware";
import { notFoundHandler } from "./middleware/not-found.middleware";

logger.info('starting')

const { PORT } = process.env;
if (!PORT) {
  logger.error('Must specify all env vars');
  process.exit(1);
}

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use("/api/cars", pricingRouter);

app.use(errorHandler);
app.use(notFoundHandler);

app.listen(PORT, () => {
  logger.info(`listening on port ${PORT}`);
});



