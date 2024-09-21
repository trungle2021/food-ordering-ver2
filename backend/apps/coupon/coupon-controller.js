const catchAsyncHandler = require('../../utils/catch-async/catch-async-handler');

const CouponService = require('./coupon-service');

const getCoupons = catchAsyncHandler(async (req, res) => {
  const coupons = await CouponService.getCoupons();
  return res.status(200).json({
    status: 'success',
    data: coupons,
  });
});

const getCoupon = catchAsyncHandler(async (req, res, next) => {
  const { id } = req.params.id;
  const coupon = await CouponService.getCoupon(id);
  if (!coupon) {
    return res.status(404).json({
      status: 'fail',
      data: null,
    });
  }
  return res.status(200).json({
    status: 'success',
    data: coupon,
  });
});

const createCoupons = catchAsyncHandler(async (req, res, next) => {
  const listCoupons = req.body;
  const coupons = await CouponService.createCoupons(listCoupons);
  return res.status(200).json({
    status: 'success',
    data: coupons,
  });
});
const createCoupon = catchAsyncHandler(async (req, res, next) => {});
const updateCoupon = catchAsyncHandler(async (req, res, next) => {});
const deleteCoupon = catchAsyncHandler(async (req, res, next) => {});

module.exports = {
  getCoupons,
  getCoupon,
  createCoupons,
  createCoupon,
  updateCoupon,
  deleteCoupon,
};
