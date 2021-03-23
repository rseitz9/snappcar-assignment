import HttpException from "./http-exception";

export default class PricingException extends HttpException {
  constructor(public message: string, public statusCode = 400) {
    super(statusCode, message);
  }
}