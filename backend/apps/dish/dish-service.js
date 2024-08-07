const Dish = require('./dish-model')
const Order = require('../order/order-model')
const ApiFeatures = require('../../utils/api-features/api-features')
const Category = require('../category/category-model')
const { COMPLETED } = require('../../constant/order-status')

const getDishes = async (queryString) => {
  const modifiedQueryString = { ...queryString }

  if (queryString.category_name) {
    const categoryNames = queryString.category_name.split(',')
    delete modifiedQueryString.category_name

    const categories = await Category.find({ name: { $in: categoryNames } })

    if (categories.length > 0) {
      // Use the category _id to find dishes
      const categoryIds = categories.map(category => category._id)
      modifiedQueryString.category = { $in: categoryIds }
    } else {
      // If category not found, return an empty array
      return []
    }
  }
  const features = new ApiFeatures(Dish.find({}), modifiedQueryString)
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
  //   const queryStringAll = {
  //     page,
  //     limit,
  //     skip
  //   }
  //   //   const feature = new ApiFeatures(Dish.find({}), queryStringAll)
  //   const all = await feature.query.populate({
  //     path: 'dish'
  //   })

  // console.log('all', all)

  const result = await Order.aggregate([
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

  //   if (result.length === 0) {
  //     console.log('Popular dishes is empty')
  //     const queryString = {
  //       page,
  //       limit,
  //       skip
  //     }
  //     const feature = new ApiFeatures(Dish.find({}), queryString)
  //     return await feature.query.populate({
  //       path: 'dish'
  //     })
  //   }
  return result
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

const validateDishesById = async (orderItems) => {
  const dishIds = orderItems.map(item => item.dish_id)
  const dishes = await Dish.find({ _id: { $in: dishIds } })

  if (dishes.length !== dishIds.length) {
    return { isValid: false, invalidDish: dishIds.filter(id => !dishes.map(dish => dish._id).includes(id)) }
  }
  return { isValid: true }
}

module.exports = {
  getDishes,
  getDish,
  getPoplularDishes,
  searchDishesByFullTextSearch,
  createDishes,
  createDish,
  updateDish,
  deleteDish,
  validateDishesById
}
