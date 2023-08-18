import {CustomAPIError} from '../errors';

interface CustomAPIErrorWithStatusCode extends CustomAPIError {
  statusCode: number;
}

export default CustomAPIErrorWithStatusCode;
