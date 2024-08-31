import httpStatus from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import { CouponServices } from './coupon.service';

const createCoupon = catchAsync(async (req, res) => {
  const result = await CouponServices.createCouponIntoDB(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Coupon added successfully',
    data: result,
  });
});

const getAllCoupons = catchAsync(async (req, res) => {
  const result = await CouponServices.getAllCouponsFromDB(req.query);

  if (result?.result?.length <= 0) {
    return sendResponse(res, {
      success: false,
      statusCode: httpStatus.OK,
      message: 'No Data Found',
      data: result,
    });
  }
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Coupons retrieved successfully',
    data: result,
  });
});
const getSingleCoupon = catchAsync(async (req, res) => {
  const { code } = req.params;

  const result = await CouponServices.getSingleCouponFromDB(code);
  if (!result) {
    return sendResponse(res, {
      success: false,
      statusCode: httpStatus.OK,
      message: 'No Route Found',
      data: null,
    });
  }
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Coupon retrieved successfully',
    data: result,
  });
});
const updateCoupon = catchAsync(async (req, res) => {
  const { id } = req.params;
  const couponData = req.body;
  const result = await CouponServices.updateCouponIntoDB(id, couponData);

  if (!result) {
    return sendResponse(res, {
      success: false,
      statusCode: httpStatus.NOT_FOUND,
      message: 'Coupon Not Found',
      data: result,
    });
  }
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Coupon updated successfully',
    data: result,
  });
});
const deleteCoupon = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await CouponServices.deleteCouponfromDB(id);

  if (!result) {
    return sendResponse(res, {
      success: false,
      statusCode: httpStatus.NOT_FOUND,
      message: 'Coupon Not Found',
      data: result,
    });
  }

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Coupon deleted successfully',
    data: result,
  });
});

export const CouponControllers = {
  createCoupon,
  getAllCoupons,
  getSingleCoupon,
  updateCoupon,
  deleteCoupon,
};
