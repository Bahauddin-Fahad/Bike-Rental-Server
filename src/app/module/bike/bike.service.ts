import QueryBuilder from '../../builder/QueryBuilder';
import { bikeSearchableFields } from './bike.constant';
import { TBike } from './bike.interface';
import { ModelBike } from './bike.model';

const createBikeIntoDB = async (payload: TBike) => {
  const result = await ModelBike.create(payload);
  return result;
};
const getAllBikesFromDB = async (query: Record<string, unknown>) => {
  let isAvailable;
  if (query.isAvailable === 'true') {
    isAvailable = true;
  } else {
    isAvailable = false;
  }

  const bikeQuery = new QueryBuilder(ModelBike.find({ isAvailable }), query)
    .search(bikeSearchableFields)
    .filter()
    .sort()
    .paginate()
    .filterFields();

  const meta = await bikeQuery.countTotal();
  const result = await bikeQuery.modelQuery;

  return { meta, result };
};
const getSingleBikeFromDB = async (id: string) => {
  return await ModelBike.findById(id);
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
  getSingleBikeFromDB,
  updateBikeIntoDB,
  deleteBikefromDB,
};
