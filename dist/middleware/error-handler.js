"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const errorHandlerMiddleware = (err, req, res, next) => {
    console.log(err);
    let customError = {
        statusCode: err.statusCode || http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR,
        msg: err.message || 'Something went wrong try again later',
    };
    // if (err instanceof CustomAPIError) {
    //   const customError = err as CustomAPIErrorWithStatusCode;
    //   return res.status(customError.statusCode).json({msg: customError.message});
    // }
    if (err.name === 'ValidationError') {
        customError.statusCode = http_status_codes_1.StatusCodes.BAD_REQUEST;
        const keys = Object.keys(err.errors).join(',');
        customError.msg = `please provide ${keys}`;
    }
    if (err.name === 'CastError') {
        customError.statusCode = http_status_codes_1.StatusCodes.NOT_FOUND;
        customError.msg = `Cast to ObjectId failed for value ${err.value}`;
    }
    if (err.code && err.code === 11000) {
        customError.msg = `Duplicate value entered for ${Object.keys(err.keyValue)} field, please choose another value`;
        customError.statusCode = http_status_codes_1.StatusCodes.BAD_REQUEST;
    }
    return res.status(customError.statusCode).json({ msg: customError.msg });
};
exports.default = errorHandlerMiddleware;
