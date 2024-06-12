import { TBike } from './bike.interface';
import { ModelBike } from './bike.model';

const createBikeIntoDB = async (payload: TBike) => {
  const result = await ModelBike.create(payload);
  return result;
};
const getAllBikesFromDB = async () => {
  const result = await ModelBike.find();
  return result;
};
const updateBikeIntoDB = async (id: string, payload: Partial<TBike>) => {
  const result = await ModelBike.findByIdAndUpdate(id, payload, { new: true });

  return result;
};
const deleteBikefromDB = async (id: string) => {
  const result = await ModelBike.findByIdAndDelete(id);

  return result;
};

export const BikeServices = {
  createBikeIntoDB,
  getAllBikesFromDB,
  updateBikeIntoDB,
  deleteBikefromDB,
};
