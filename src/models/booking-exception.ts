import HttpException from "./http-exception";

export default class BookingException extends HttpException {
  constructor(public message: string, public statusCode = 400) {
    super(statusCode, message);
  }
}