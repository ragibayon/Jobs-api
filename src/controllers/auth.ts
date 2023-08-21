import {Request, Response, NextFunction} from 'express';
import {StatusCodes} from 'http-status-codes';
import User from '../models/User';
import {IUser} from '../interfaces';
import {BadRequestError, UnauthenticatedError} from '../errors';

export const register = async (req: Request, res: Response) => {
  const user: IUser = await User.create({...req.body});
  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({user: {name: user.name}, token});
};

export const login = async (req: Request, res: Response) => {
  const {email, password} = req.body;
  if (!email || !password) {
    throw new BadRequestError('Please provide valid email and password');
  }
  const user: IUser = await User.findOne({email: email});
  if (!user) {
    throw new UnauthenticatedError('Invalid Credentials');
  }
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError('Invalid Credentials');
  }

  res
    .status(StatusCodes.OK)
    .json({user: {name: user.name}, token: user.createJWT()});
};
