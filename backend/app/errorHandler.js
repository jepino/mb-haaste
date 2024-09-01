import config from './config.js';

export class BadRequest extends Error {
  constructor(message) {
    super(message || 'Bad Request');
    this.name = 'BadRequest';
    this.status = 400;
  }
}
export class NotFound extends Error {
  constructor(message) {
    super(message || 'Not Found');
    this.name = 'NotFound';
    this.status = 404;
  }
}
export class InternalServerError extends Error {
  constructor(message) {
    super(message || 'Internal Server Error');
    this.name = 'InternalServerError';
    this.status = 500;
  }
}
export class NotImplemented extends Error {
  constructor(message) {
    super(message || 'Not Implemented');
    this.name = 'NotImplemented';
    this.status = 501;
  }
}

const errorHandler = (err, req, res, _next) => {
  res.status(err.status || 500);
  req.error = err;
  if (config.nodeEnv !== 'production' && res.statusCode >= 500) {
    console.error(err);
  }
  return res.send({ ...err.data, message: err.message });
};

export default errorHandler;
