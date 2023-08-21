import {CustomAPIError} from '../errors';
import {StatusCodes} from 'http-status-codes';
import {Request, Response, NextFunction} from 'express';
import CustomAPIErrorWithStatusCode from '../interfaces/ICustomAPIError';

const errorHandlerMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(err);
  let customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || 'Something went wrong try again later',
  };

  // if (err instanceof CustomAPIError) {
  //   const customError = err as CustomAPIErrorWithStatusCode;
  //   return res.status(customError.statusCode).json({msg: customError.message});
  // }

  if (err.name === 'ValidationError') {
    customError.statusCode = StatusCodes.BAD_REQUEST;
    const keys = Object.keys(err.errors).join(',');
    customError.msg = `please provide ${keys}`;
  }

  if (err.name === 'CastError') {
    customError.statusCode = StatusCodes.NOT_FOUND;
    customError.msg = `Cast to ObjectId failed for value ${err.value}`;
  }

  if (err.code && err.code === 11000) {
    customError.msg = `Duplicate value entered for ${Object.keys(
      err.keyValue
    )} field, please choose another value`;
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }

  return res.status(customError.statusCode).json({msg: customError.msg});
};

export default errorHandlerMiddleware;
