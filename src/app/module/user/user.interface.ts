/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';
import { USER_ROLE } from './user.constant';

export type TUserRole = keyof typeof USER_ROLE;

export interface TUser {
  id: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  role: TUserRole;
}
export interface UserModel extends Model<TUser> {
  doesUserExist(id: string): Promise<TUser>;
}
