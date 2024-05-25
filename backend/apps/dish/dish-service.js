const Dish = require('./dish-model')
const Order = require('../order/model/order-model')
const ApiFeatures = require('../../utils/api-features/api-features')
const { COMPLETED } = require('../../constant/order-status')

const getDishes = async (queryString) => {
  const features = new ApiFeatures(Dish.find(), queryString)
    .filter()
    .sort()
    .limitFields()
    .paginate()

  return await features.query.populate({ path: 'category', select: 'name' })
}

const getDish = async (queryString) => {
  return await Dish.findOne(queryString)
}

const getPoplularDishes = async (queryString) => {
  const page = queryString.page * 1 || 1
  const limit = queryString.limit * 1 || 10
  const skip = (page - 1) * limit
  return await Order.aggregate([
    {
      $match: {
        order_status: COMPLETED
      }
    },
    {
      $lookup: {
        from: 'orderdetails',
        localField: '_id',
        foreignField: 'order',
        as: 'order_detail'
      }
    },
    {
      $unwind: '$order_detail'
    },
    {
      $group: {
        _id: '$order_detail.dish',
        count: { $sum: '$order_detail.quantity' }
      }
    },
    {
      $lookup: {
        from: 'dishes',
        localField: '_id',
        foreignField: '_id',
        as: 'dish'
      }
    },
    {
      $unwind: '$dish'
    },
    {
      $sort: { count: -1 }
    },
    {
      $skip: skip// Skip the first 5 documents
    },
    {
      $limit: limit // Limit the result to 10 documents
    }
  ])
}

const searchDishesByFullTextSearch = async (value, limit) => {
  const pipeline = [
    {
      $search: {
        index: 'default',
        compound: {
          should: [
            {
              autocomplete: {
                query: value,
                fuzzy: {
                  maxEdits: 1
                },
                path: 'name'
              }
            },
            {
              text: {
                query: value,
                path: 'description'
              }
            }
          ],
          minimumShouldMatch: 1
        }
      }
    },
    {
      $limit: limit
    }

  ]
  return Dish.aggregate(pipeline)
}

const createDishes = async (dishes) => {
  return await Dish.insertMany(dishes)
}

const createDish = async (dish) => {
  return await Dish.create(dish)
}

const updateDish = async (dish) => {

}
const deleteDish = async (dish) => {

}

module.exports = {
  getDishes,
  getDish,
  getPoplularDishes,
  searchDishesByFullTextSearch,
  createDishes,
  createDish,
  updateDish,
  deleteDish
}
