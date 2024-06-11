import { Schema, model } from 'mongoose';
import { TUser, UserModel } from './user.interface';

const userSchema = new Schema<TUser, UserModel>(
  {
    name: {
      type: String,
      required: [true, 'Name is Required'],
      maxlength: [20, "Name can't be more than 20 characters"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is Required'],
      unique: true,
      trim: true,
    },
    password: { type: String, required: true, select: 0 },
    phone: { type: String, required: [true, 'Phone is Required'] },
    address: {
      type: String,
      required: [true, 'Address is Required'],
      trim: true,
    },
    role: { type: String, enum: ['user', 'admin'] },
  },
  { timestamps: true },
);
userSchema.statics.doesUserExist = async function (email: string) {
  return await ModelUser.findOne({ email }).select('+password');
};
export const ModelUser = model<TUser, UserModel>('User', userSchema);
