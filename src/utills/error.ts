export class AppError extends Error {
  status: number;
  isOperational: boolean;
  constructor(message: string, status: number, isOperational: boolean) {
    super(message);
    this.status = status;
    this.isOperational = isOperational;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
}
}