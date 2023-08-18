import {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import {UnauthenticatedError} from '../errors';
import {AuthenticatedUser} from '../interfaces';

// Extend the Request type to include the user property
declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
        username: string;
      };
    }
  }
}

export const authenticateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // check header (verify jwt)
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new UnauthenticatedError('Authentication Invalid');
  }

  const token = authHeader.split(' ')[1];
  try {
    const payload = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as AuthenticatedUser;

    req.user = {
      userId: payload.userId,
      username: payload.username,
    };
    next();
  } catch (error) {
    throw new UnauthenticatedError('Authentication Failed');
  }
  //
};
