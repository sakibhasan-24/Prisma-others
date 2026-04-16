export class AppError extends Error {
  status: number;
  isOperational: boolean;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
    this.isOperational = true;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
}
}