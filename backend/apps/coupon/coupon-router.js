const express = require('express')
const router = express.Router()
const CouponController = require('../coupon/coupon-controller')

router.route('/:id')
  .get(CouponController.getCoupon)
  .get(CouponController.deleteCoupon)
  .put(CouponController.updateCoupon)

router.route('/bulk')
  .post(CouponController.createCoupons)

router.route('/')
  .get(CouponController.getCoupons)
  .post(CouponController.createCoupon)

module.exports = router
