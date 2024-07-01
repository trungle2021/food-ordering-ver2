const AppError = require('../../utils/error/app-error')
const Order = require('./order-model')
const OrderDetailService = require('../order_detail/order-detail-service')
const connection = require('../../db/connection')
const { processPayment } = require('../payment/payment-service')
const { PROCESSING, COMPLETED, SHIPPING } = require('../../constant/order-status')
const { PAID } = require('../../constant/payment-status')
const ApiFeatures = require('../../utils/api-features/api-features')
const { convertToObjectId } = require('../../utils/mongoose/mongoose-utils')

const getOrders = async (queryString) => {
  const features = new ApiFeatures(Order.find(), queryString)
    .filter()
    .limitFields()
    .sort()
    .paginate()

  //   const totalItem = await features.countItems()
  const orders = await features.query

  return { orders }
}

const getOrder = async (filter) => {
  const order = await Order.findOne(filter)
  if (!order) {
    return null
  }
  return order
}

const getOrderHistory = async (userId, queryString) => {
  const userIdConverted = await convertToObjectId(userId)
  const page = (queryString.page && Number(queryString.page)) || 1
  const pageSize = (queryString.limit && Number(queryString.limit)) || 10
  const skipNum = (page - 1) * pageSize
  const modifiedQueryString = new ApiFeatures(null, queryString).prepareQueryObject()
  const modifiedQueryObject = JSON.parse(modifiedQueryString)
  const orderStatus = modifiedQueryObject.order_status
  const orderDate = modifiedQueryObject.order_date
  const dishName = queryString.dish_name


  const match = {
    $match: {
      user: userIdConverted
    }
  }

  const lookupOrderDetail = {
    $lookup: {
      from: 'orderdetails',
      localField: '_id',
      foreignField: 'order',
      as: 'order_details'
    }
  }

  const unwindOrderDetail = {
    $unwind: '$order_details'
  }

  const lookupDish = {
    $lookup: {
      from: 'dishes',
      localField: 'order_details.dish',
      foreignField: '_id',
      as: 'order_details.dish'
    }
  }

  const unwindDish = {
    $unwind: '$order_details.dish'
  }

  const group = {
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
      __v: { $first: '$__v' }
    }
  }

  const project = {
    $project: {
      _id: 1,
      user: 1,
      order_status: 1,
      order_total: 1,
      payment_status: 1,
      payment_method: 1,
      order_date: 1,
      order_details: {
        dish: {
          name: 1,
          image: 1
        },
        quantity: 1,
        price: 1
      },
      shipping_address: 1,
      time_completed: 1,
      created_at: 1,
      updated_at: 1
    }
  }

  const sort = {
    $sort: { order_date: 1 }
  }

  const skip = {
    $skip: skipNum
  }

  const limit = {
    $limit: pageSize
  }

  const count = {
    $count: 'count'
  }

  const facet = {
    $facet: {
      totalCount: [
        count
      ],
      orders: [
        project, // select field from dish object
        sort,
        skip,
        limit
      ]
    }
  }

  if (orderStatus) {
    match.$match.order_status = orderStatus
  }

  if (orderDate && typeof orderDate === 'object') {
    const modifiedOrderDate = convertDateStringToDateObject(orderDate)
    match.$match.order_date = modifiedOrderDate
  }

  const getOrderHistoryPipeline = [
    match,
    lookupOrderDetail,
    unwindOrderDetail,
    lookupDish, // after lookup dish object become dish array
    unwindDish, // convert dish array into dish object
    group, // group and reassemble order details back into array
    facet
  ]

  if (dishName) {
    const matchDishByDishName = {
      $match: {
        'order_details.dish.name': { $regex: dishName, $options: 'i' }
      }
    }
    facet.$facet.totalCount.splice(0, 0, matchDishByDishName)
    facet.$facet.orders.splice(0, 0, matchDishByDishName)
  }

  const result = await Order.aggregate(getOrderHistoryPipeline)
  const totalItems = result[0].totalCount[0]?.count || 0
  const totalPages = Math.ceil(totalItems / pageSize)
  const orders = result[0].orders
  return { totalItems, totalPages, orders }
}

const convertDateStringToDateObject = (orderDate) => {
  for (const key in orderDate) {
    if (Object.prototype.hasOwnProperty.call(orderDate, key)) {
      orderDate[key] = new Date(orderDate[key])
      console.log('date', new Date(orderDate[key]))
    }
  }
  return orderDate
}

const createOrder = async (order, orderItems) => {
  const session = await connection.startSession()
  try {
    session.startTransaction()
    const orderTotal = orderItems.reduce((total, item) => {
      return total + (item.price * item.quantity)
    }, 0)
    order.order_total = orderTotal
    const orderCreated = await Order.create([order], { session })
    const orderId = orderCreated[0]._id
    await OrderDetailService.createOrderDetails(orderId, orderItems, { session })
    await session.commitTransaction()
    return orderCreated
  } catch (error) {
    await session.abortTransaction()
    throw new AppError(error.message, error.statusCode)
  } finally {
    await session.endSession()
  }
}

const confirmOrder = async (orderConfirmInfo) => {
  let orderAfterPaid
  const session = await connection.startSession()
  try {
    session.startTransaction()

    const {
      order_id: orderId,
      shipping_address: shippingAddress,
      payment_info: { payment_method: paymentMethod }
    } = orderConfirmInfo

    const order = await Order.findById(orderId)
    if (!order) {
      throw new AppError('Order not found', 404)
    }
    orderAfterPaid = await processPayment(order, orderConfirmInfo)
    orderAfterPaid.payment_method = paymentMethod
    orderAfterPaid.order_status = PROCESSING
    orderAfterPaid.shipping_address = shippingAddress
    orderAfterPaid.payment_status = PAID
    await orderAfterPaid.save()
    session.commitTransaction()
  } catch (err) {
    session.abortTransaction()
    throw new AppError(err.message, err.statusCode)
  } finally {
    session.endSession()
  }
  return orderAfterPaid
}

const completeOrder = async (orderId) => {
  const order = await Order.findOne({ _id: orderId })
  if (!order) {
    throw new AppError('Order not found', 404)
  }

  switch (order.order_status) {
    case SHIPPING:
      order.order_status = COMPLETED
      order.time_completed = Date.now()
      return await order.save()
    case COMPLETED:
      throw new AppError('Order already completed', 409)
    default:
      throw new AppError('Order cannot be completed', 409)
  }
}

const getRecentOrders = async (userId, queryString) => {
  const userIdConverted = await convertToObjectId(userId)

  const recentOrders = await Order.find({
    order_status: COMPLETED,
    user: userIdConverted
  })
    .populate({
      path: 'order_details',
      populate: [
        {
          path: 'order',
          model: 'Order'
        },
        {
          path: 'dish',
          model: 'Dish'
        }
      ]
    })
    .exec()
  return recentOrders
}

const cancelOrder = async (orderCancel) => {
}

const deleteOrder = async (filter) => {
  await Order.deleteOne(filter)
}

const deleteAll = async () => {
  await Order.deleteMany({})
  await OrderDetailService.deleteAll()
}

module.exports = {
  getOrders,
  getOrder,
  getOrderHistory,
  getRecentOrders,
  createOrder,
  confirmOrder,
  completeOrder,
  cancelOrder,
  deleteOrder,
  deleteAll
}
