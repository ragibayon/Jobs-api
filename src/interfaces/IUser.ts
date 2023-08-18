import {Document} from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  createJWT: () => string;
  comparePassword: (candidatePassword: string) => boolean;
}
