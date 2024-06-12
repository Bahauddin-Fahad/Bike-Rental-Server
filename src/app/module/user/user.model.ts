import { Schema, model } from 'mongoose';
import { TUser, UserModel } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';

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
  { timestamps: true, versionKey: false },
);

userSchema.statics.doesUserExist = async function (email: string) {
  return await ModelUser.findOne({ email }).select('+password');
};
userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});
userSchema.post('save', async function (doc, next) {
  doc.password = '';
  next();
});

userSchema.statics.isPasswordMatched = async function (
  plainTextPassword,
  hashedPassword,
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};
export const ModelUser = model<TUser, UserModel>('User', userSchema);
