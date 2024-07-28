export default class HttpError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;

    // Set the prototype explicitly to maintain the instanceof check
    Object.setPrototypeOf(this, HttpError.prototype);
  }
}
