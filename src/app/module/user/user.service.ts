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

export const UserServices = {
  getProfilefromDB,
  updateProfileInDB,
};
