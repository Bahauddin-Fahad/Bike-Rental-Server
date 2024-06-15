import jwt from 'jsonwebtoken';
import { Schema } from 'mongoose';

export const createToken = (
  jwtPayload: { _id: Schema.Types.ObjectId; email: string; role: string },
  secret: string,
  expiresIn: string,
) => {
  return jwt.sign(jwtPayload, secret, {
    expiresIn,
  });
};
