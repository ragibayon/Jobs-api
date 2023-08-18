import {Schema, model, Document} from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import {IUser} from '../interfaces';

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: [true, 'Please provide a valid name'],
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    required: [true, 'Please provide email address'],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Please provide valid email',
    ],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 4,
  },
});

userSchema.pre('save', async function () {
  this.password = await bcrypt.hash(this.password, 12);
});

userSchema.methods.createJWT = function () {
  return jwt.sign(
    {userId: this._id, username: this.name},
    process.env.JWT_SECRET!.toString(),
    {
      expiresIn: process.env.JWT_LIFETIME!.toString(),
    }
  );
};

userSchema.methods.comparePassword = async function (
  candidatePassword: string
) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

const User = model('User', userSchema);
export default User;
