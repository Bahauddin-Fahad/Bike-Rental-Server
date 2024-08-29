/* eslint-disable @typescript-eslint/no-explicit-any */
import QueryBuilder from '../../builder/QueryBuilder';
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
  const usersQuery = new QueryBuilder(
    ModelUser.find().select('-password'),
    query,
  )
    .filter()
    .sort()
    .paginate()
    .filterFields();

  const meta = await usersQuery.countTotal();
  const result = await usersQuery.modelQuery;

  return { meta, result };
};
const updateUserRoleIntoDB = async (id: string, payload: Partial<TUser>) => {
  const result = await ModelUser.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};
const deleteUserFromDB = async (id: string, payload: Partial<TUser>) => {
  const result = await ModelUser.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

export const UserServices = {
  getProfilefromDB,
  updateProfileInDB,
  getAllUsersFromDB,
  updateUserRoleIntoDB,
  deleteUserFromDB,
};
