/* eslint-disable no-unused-vars */
import { Model, Schema } from 'mongoose';
import { USER_ROLE } from './user.constant';

export type TUserRole = keyof typeof USER_ROLE;

export interface TUser {
  _id?: Schema.Types.ObjectId;
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  image: string;
  role: TUserRole;
  isDeleted: boolean;
}
export interface UserModel extends Model<TUser> {
  doesUserExist(id: string): Promise<TUser>;
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
}
