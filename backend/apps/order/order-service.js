const AppError = require('../../utils/error/app-error');
const Order = require('./order-model');
const OrderDetailService = require('../order_detail/order-detail-service');
const connection = require('../../db/connection');
const { processPayment } = require('../payment/payment-service');
const {
  PROCESSING,
  COMPLETED,
  SHIPPING,
  PENDING,
  CANCELED,
} = require('../../constant/order-status');
const { PAID, REFUNDED } = require('../../constant/payment-status');
const ApiFeatures = require('../../utils/api-features/api-features');
const { convertToObjectId } = require('../../utils/mongoose/mongoose-utils');
const CartService = require('../cart/cart-service');
const UserService = require('../user/user-service');
const Favorite = require('../favorite/favorite-model');
const paginate = require('../../utils/api-features/paginate');
const paginateAggregate = require('../../utils/api-features/paginateAggregate');
const checkOutSessionService = require('./checkout-session-service');

const checkOutOld = async (userId, orderDetailsHasBeenUpdated) => {
  const session = await connection.startSession();

  let address = null;
  let orderTotal = 0;

  const user = await UserService.getUser({ _id: userId });

  if (!user) {
    throw new AppError('User not found', 404);
  }

  const cart = await CartService.getCart({ user: userId });

  if (!cart) {
    throw new AppError('Cart not found', 404);
  }

  if (cart.items.length === 0) {
    throw new AppError('Cart is empty', 409);
  }

  const orderItems = [...cart.items];
  const pendingOrder = await Order.findOne({ user: userId, order_status: PENDING });
  const userHasAPendingOrder = pendingOrder !== null;

  if (userHasAPendingOrder) {
    if (orderDetailsHasBeenUpdated) {
      orderTotal = await calculateOrderTotal(orderItems);
      pendingOrder.order_total = orderTotal.toFixed(2);

      const orderId = pendingOrder._id;
      const itemIdList = await OrderDetailService.createOrderDetails(orderId, orderItems, {
        session,
      });

      pendingOrder.order_details = itemIdList;
      await pendingOrder.save();
    }
    return pendingOrder;
  }

  if (user.user_address.length > 0) {
    const userAddressList = user.user_address.toObject();
    address = userAddressList.find((address) => address.is_default_address === true);
    if (!address) {
      // pick the first address if no default address
      address = user.addresss[0];
    }
  }

  try {
    session.startTransaction();

    orderTotal = await calculateOrderTotal(orderItems);

    const order = {
      user: userId,
      order_details: orderItems,
      order_total: orderTotal.toFixed(2),
      order_date: Date.now(),
      shipping_address: JSON.stringify(address),
    };
    const result = await Order.create([order], { session });
    const orderCreated = result[0];

    if (!orderCreated) {
      throw new AppError('Failed to create order', 500);
    }
    if (orderCreated.shipping_address) {
      orderCreated.shipping_address = JSON.parse(orderCreated.shipping_address);
    }

    const orderId = orderCreated._id;
    const itemIdList = await OrderDetailService.createOrderDetails(orderId, orderItems, {
      session,
    });

    orderCreated.order_details = [...itemIdList];

    await orderCreated.save();

    await session.commitTransaction();

    return orderCreated;
  } catch (error) {
    await session.abortTransaction();
    throw new AppError(error.message, 500);
  } finally {
    await session.endSession();
  }
};

const getCheckoutSession = async (sessionId) => {
  const sessionData = await checkOutSessionService.getSession(sessionId);
  if (!sessionData) {
    throw new AppError('Checkout session not found', 404);
  }
  return sessionData;
}

const checkOut = async (userId) => {
  let shipping_address = null;

  const user = await UserService.getUser({ _id: userId });

  if (!user) {
    throw new AppError('User not found', 404);
  }

  if (user.user_address.length > 0) {
    const userAddressList = user.user_address.toObject();
    shipping_address = JSON.stringify(
      userAddressList.find((address) => address.is_default_address) || userAddressList[0]
    ); // Pick the first address if no default address
  }

  const cart = await CartService.getCart({ user: userId });

  if (!cart) {
    throw new AppError('Cart not found', 404);
  }

  if (cart.items.length === 0) {
    throw new AppError('Cart is empty', 409);
  }

  const cartItems = [...cart.items];

  const {sessionId, sessionData} = await checkOutSessionService.createSession(userId, cartItems, shipping_address);
  return {sessionId, sessionData};
};

const confirmOrder = async (orderConfirmInfo) => {
  let orderAfterPaid;
  const session = await connection.startSession();
  try {
    session.startTransaction();

    const {
      orderId,
      paymentInfo: { paymentMethod },
    } = orderConfirmInfo;

    const order = await Order.findById(orderId);
    if (!order) {
      throw new AppError('Order not found', 404);
    }
    orderAfterPaid = await processPayment(order, orderConfirmInfo);
    orderAfterPaid.payment_method = paymentMethod;
    orderAfterPaid.order_status = PROCESSING;
    orderAfterPaid.payment_status = PAID;
    await orderAfterPaid.save();
    session.commitTransaction();
  } catch (err) {
    session.abortTransaction();
    throw new AppError(err.message, err.statusCode);
  } finally {
    session.endSession();
  }
  return orderAfterPaid;
};

const completeOrder = async (orderId) => {
  const order = await Order.findOne({ _id: orderId });
  if (!order) {
    throw new AppError('Order not found', 404);
  }

  switch (order.order_status) {
    case SHIPPING:
      order.order_status = COMPLETED;
      order.time_completed = Date.now();
      return await order.save();
    case COMPLETED:
      throw new AppError('Order already completed', 409);
    default:
      throw new AppError('Order cannot be completed', 409);
  }
};

const getRecentOrders = async (userId, queryString) => {
  const userIdConverted = await convertToObjectId(userId);

  const recentOrders = await Order.find({
    order_status: COMPLETED,
    user: userIdConverted,
  })
    .populate({
      path: 'order_details',
      populate: [
        {
          path: 'order',
          model: 'Order',
        },
        {
          path: 'dish',
          model: 'Dish',
        },
      ],
    })
    .exec();

  // after fetching the recent order , filter for favorite info
  const recentOrdersWithFavorites = await Promise.all(
    recentOrders.map(async (order) => {
      const orderDetailsWithFavorites = await Promise.all(
        order.order_details.map(async (detail) => {
          const favoriteInfo = await Favorite.findOne({
            user: userIdConverted,
            dish: detail.dish._id,
          });

          // Update the dish object to include favoriteInfo
          const updatedDish = {
            ...detail.dish.toObject(),
            favoriteInfo, // Add favoriteInfo to the dish object
          };

          return {
            ...detail.toObject(),
            dish: updatedDish, // Replace the dish in the detail with the updated dish
          };
        })
      );

      return {
        ...order.toObject(),
        order_details: orderDetailsWithFavorites,
      };
    })
  );

  return recentOrdersWithFavorites;
};

const cancelOrder = async (orderCancelPayload) => {
  const { orderId, cancelReasonId } = orderCancelPayload;

  const order = await Order.findById(orderId);

  if (!order) {
    throw new AppError('Order not found', 404);
  }

  // {
  //     admin cancel order logic here
  // }

  // this case used for user
  if (order.order_status !== PENDING) {
    throw new AppError('Order cannot be cancelled', 409);
  }

  order.order_status = CANCELED;
  order.payment_status = REFUNDED;

  // {
  //     refund logic here
  // }

  order.cancel_reason = cancelReasonId;
  await order.save();
};

const updateOrder = async (filter, payload) => {
  return await Order.findOneAndUpdate(filter, payload, { returnDocument: 'after' });
};

const deleteOrder = async (filter) => {
  await Order.deleteOne(filter);
};

const deleteAll = async () => {
  await Order.deleteMany({});
  await OrderDetailService.deleteAll();
};

const getOrders = async (queryString) => {
  const { page = 1, limit = 10 } = queryString;
  const features = new ApiFeatures(Order.find(), queryString).filter().limitFields().sort();
  return await paginate(Order, features.query, parseInt(page, 10), parseInt(limit, 10));
};

const getOrder = async (filter) => {
  return await Order.findOne(filter)
    .populate({
      path: 'order_details',
      populate: {
        path: 'dish',
        model: 'Dish',
      },
    })
    .exec();
};

const getOrderHistory = async (userId, queryString) => {
  const { page = 1, limit = 10, order_status, order_date, dish_name } = queryString;
  const userIdConverted = await convertToObjectId(userId);

  const pipeline = [
    { $match: { user: userIdConverted, ...(order_status && { order_status }) } },
    {
      $lookup: {
        from: 'orderdetails',
        localField: '_id',
        foreignField: 'order',
        as: 'order_details',
      },
    },
    { $unwind: '$order_details' },
    {
      $lookup: {
        from: 'dishes',
        localField: 'order_details.dish',
        foreignField: '_id',
        as: 'order_details.dish',
      },
    },
    { $unwind: '$order_details.dish' },
    {
      $group: {
        _id: '$_id',
        order_status: { $first: '$order_status' },
        payment_status: { $first: '$payment_status' },
        payment_method: { $first: '$payment_method' },
        order_total: { $first: '$order_total' },
        time_completed: { $first: '$time_completed' },
        created_at: { $first: '$created_at' },
        updated_at: { $first: '$updated_at' },
        user: { $first: '$user' },
        order_date: { $first: '$order_date' },
        shipping_address: { $first: '$shipping_address' },
        order_details: { $push: '$order_details' },
      },
    },
    {
      $project: {
        _id: 1,
        user: 1,
        order_status: 1,
        order_total: 1,
        payment_status: 1,
        payment_method: 1,
        order_date: 1,
        'order_details.dish._id': 1,
        'order_details.dish.name': 1,
        'order_details.dish.image': 1,
        'order_details.quantity': 1,
        'order_details.price': 1,
        shipping_address: 1,
        time_completed: 1,
        created_at: 1,
        updated_at: 1,
      },
    },
    { $sort: { order_date: -1 } },
  ];

  if (order_date && typeof order_date === 'object') {
    match.$match.order_date = convertDateStringToDateObject(order_date);
  }

  if (dish_name) {
    pipeline.push({
      $match: { 'order_details.dish.name': { $regex: dish_name, $options: 'i' } },
    });
  }

  return await paginateAggregate(Order, pipeline, parseInt(page, 10), parseInt(limit, 10));
};

const convertDateStringToDateObject = (orderDate) => {
  for (const key in orderDate) {
    if (Object.prototype.hasOwnProperty.call(orderDate, key)) {
      orderDate[key] = new Date(orderDate[key]);
      console.log('date', new Date(orderDate[key]));
    }
  }
  return orderDate;
};

const calculateOrderTotal = async (orderItems) => {
  return orderItems.reduce((total, item) => {
    return total + item.dish.price * item.quantity;
  }, 0);
};

module.exports = {
  getOrders,
  getOrder,
  getOrderHistory,
  getRecentOrders,
  checkOut,
  updateOrder,
  confirmOrder,
  completeOrder,
  cancelOrder,
  deleteOrder,
  deleteAll,
  getCheckoutSession,
};
