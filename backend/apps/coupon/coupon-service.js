const AppError = require('../../utils/error/app-error');
const Coupon = require('./coupon-model');

const getCoupons = async () => {
  return await Coupon.find({}).populate({ path: 'category', select: 'name' });
};

const getCoupon = async (id) => {
  const coupon = await Coupon.findById(id);
  if (!coupon) {
    return null;
  }
  return coupon;
};

const createCoupons = async (coupons) => {
  return await Coupon.insertMany(coupons);
};

const createCoupon = async (coupon) => {
  return await Coupon.create(coupon);
};

const updateCoupon = async (coupon) => {};

const deleteCoupon = async (coupon) => {};

module.exports = {
  getCoupons,
  getCoupon,
  createCoupons,
  createCoupon,
  updateCoupon,
  deleteCoupon,
};
