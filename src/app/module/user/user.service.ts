/* eslint-disable @typescript-eslint/no-explicit-any */
import { TUser } from './user.interface';
import { ModelUser } from './user.model';

const getProfilefromDB = async (email: string) => {
  const user = await ModelUser.findOne({ email }).select('-password');
  return user;
};

const updateProfileInDB = async (email: string, payload: Partial<TUser>) => {
  const user = await ModelUser.findOneAndUpdate({ email }, payload, {
    new: true,
  }).select('-password -__v -createdAt -updatedAt');
  return user;
};

const getAllUsersFromDB = async (query: any) => {
  const result = query
    ? await ModelUser.find(query).select('-password')
    : await ModelUser.find().select('-password');

  return result;
};
export const UserServices = {
  getProfilefromDB,
  updateProfileInDB,
  getAllUsersFromDB,
};
