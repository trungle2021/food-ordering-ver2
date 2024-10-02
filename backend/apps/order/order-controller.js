const catchAsyncHandler = require('../../utils/catch-async/catch-async-handler');
const OrderService = require('./order-service');

const getOrders = catchAsyncHandler(async (req, res) => {
  const queryString = { ...req.query };
  const orders = await OrderService.getOrders(queryString);
  return res.status(200).json({
    status: 'success',
    data: orders,
  });
});

const getRecentOrders = catchAsyncHandler(async (req, res, next) => {
  const { userId } = req.params;
  const queryString = { ...req.query };
  const recentOrders = await OrderService.getRecentOrders(userId, queryString);
  return res.status(200).json({
    status: 'success',
    data: recentOrders,
  });
});

const getOrder = catchAsyncHandler(async (req, res, next) => {
  const { orderId } = req.params;
  const order = await OrderService.getOrder({ _id: orderId });
  if (!order) {
    return res.status(404).json({
      status: 'fail',
      data: null,
    });
  }
  return res.status(200).json({
    status: 'success',
    data: order,
  });
});

const getOrderHistory = catchAsyncHandler(async (req, res, next) => {
  const { userId } = req.params;
  const queryString = { ...req.query };
  const result = await OrderService.getOrderHistory(
    userId,
    queryString
  );
  return res.status(200).json({
    status: 'success',
    data: result
  });
});

const completeOrder = catchAsyncHandler(async (req, res, next) => {
  const { orderId } = req.body;
  const order = await OrderService.completeOrder(orderId);
  return res.status(200).json({
    status: 'success',
    data: order,
  });
});

const deleteAll = catchAsyncHandler(async (req, res, next) => {
  await OrderService.deleteAll();
  return res.status(200).json({
    status: 'success',
    message: 'All orders deleted',
  });
});

const checkOut = catchAsyncHandler(async (req, res, next) => {
  const userId = req.userId;
  const { cartHasBeenUpdated } = req.body;
  const orderCreated = await OrderService.checkOut(userId, cartHasBeenUpdated);
  res.status(200).json({
    status: 'success',
    data: orderCreated,
  });
});

const confirmOrder = catchAsyncHandler(async (req, res, next) => {
  const orderConfirmed = await OrderService.confirmOrder(req.body);
  if (orderConfirmed) {
    return res.status(200).json({
      status: 'success',
      message: 'Order Successfully',
    });
  } else {
    return res.status(409).json({
      status: 'fail',
      message: 'Order Failed',
    });
  }
});

const cancelOrder = catchAsyncHandler(async (req, res, next) => {
  await OrderService.cancelOrder(req.body);
  return res.status(200).json({
    status: 'success',
    message: 'Order Cancelled Successfully',
  });
});

const updateOrder = catchAsyncHandler(async (req, res, next) => {
  const { orderId } = req.params;
  const { addressId, cancelReason } = req.body;

  const filter = {
    _id: orderId,
  };

  const payload = {};
  if (addressId !== undefined) payload.shipping_address = addressId;
  if (cancelReason !== undefined) payload.cancel_reason = cancelReason;

  const updatedOrder = await OrderService.updateOrder(filter, payload);
  if (!updatedOrder) {
    return res.status(404).json({
      status: 'fail',
      message: 'Update Order Failed',
    });
  }
  return res.status(200).json({
    status: 'success',
    data: updatedOrder,
  });
});

module.exports = {
  getOrders,
  getRecentOrders,
  getOrder,
  getOrderHistory,
  checkOut,
  updateOrder,
  cancelOrder,
  confirmOrder,
  completeOrder,
  deleteAll,
};
