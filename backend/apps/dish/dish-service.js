const Dish = require('./dish-model')
const Order = require('../order/order-model')
const ApiFeatures = require('../../utils/api-features/api-features')
const Category = require('../category/category-model')
const { COMPLETED } = require('../../constant/order-status')
const { ObjectId } = require('mongodb')
const { Favorite } = require('@mui/icons-material')

// const getDishes = async (queryString) => {
//   const modifiedQueryString = { ...queryString }

//   if (queryString.category_name) {
//     const categoryNames = queryString.category_name
//     delete modifiedQueryString.category_name

//     const categories = await Category.find({ name: { $in: categoryNames } })

//     if (categories.length > 0) {
//       // Use the category _id to find dishes
//       const categoryIds = categories.map(category => category._id)
//       modifiedQueryString.category = { $in: categoryIds }
//     } else {
//       // If category not found, return an empty array
//       return []
//     }
//   }
//   const features = new ApiFeatures(Dish.find({}), modifiedQueryString)
//     .filter()
//     .sort()
//     .limitFields()
//     .paginate()

//   let query = features.query.populate({ path: 'category', select: 'name' })

//   if (queryString.userId) {
//     query = query.populate({
//       path: 'favorites',
//       match: { user: queryString.userId },
//       select: '_id user dish'
//     })
//   }

//   return await query
// }

const getDishes = async (userId, queryString) => {
  let favorites = []
  const modifiedQueryString = { ...queryString }

  if (queryString.category_name) {
    const categoryNames = queryString.category_name
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

  const dishFeatures = new ApiFeatures(Dish.find({}), modifiedQueryString)
    .filter()
    .sort()
    .limitFields()
    .paginate()

  const dishQuery = dishFeatures.query.populate({ path: 'category', select: 'name' })

  const dishes = await dishQuery

  if (queryString.userId) {
    const favoriteFeatures = new ApiFeatures(Favorite.find({}), { user: userId }).query
    const favoriteQuery = favoriteFeatures.query
    favorites = [...await favoriteQuery]
  }

  dishes.map(dish => {
    
  })

}

const getDish = async (queryString) => {
  return await Dish.findOne(queryString)
}

const getPopularDishes = async (userId, queryString) => {
  const page = queryString.page * 1 || 1
  const limit = queryString.limit * 1 || 10
  const skip = (page - 1) * limit

  const pipeline = [
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
        totalQuantity: { $sum: '$order_detail.quantity' }
      }
    },
    {
      $sort: { totalQuantity: -1 }
    },
    {
      $skip: skip
    },
    {
      $limit: limit
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
      $project: {
        _id: 0,
        dish: 1,
        totalQuantity: 1
      }
    }
  ]

  if (userId) {
    pipeline.push(
      {
        $lookup: {
          from: 'favorites',
          let: { dishId: '$dish._id' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ['$dish', '$$dishId'] },
                    { $eq: ['$user', new ObjectId(userId)] }
                  ]
                }
              }
            }
          ],
          as: 'favorite_info'
        }
      },
      {
        $unwind: {
          path: '$favorite_info',
          preserveNullAndEmptyArrays: true // Include dishes even if they are not in the favorite collection
        }
      }
    )
  }

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

  const result = await Order.aggregate(pipeline)
  return result
}

const searchDishesByFullTextSearch = async (value, limit, userId) => {
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
      $limit: limit * 1 || 10
    },
    {
      $lookup: {
        from: 'favorites',
        let: { dishId: '$_id' },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ['$dish', '$$dishId'] },
                  { $eq: ['$user', new ObjectId(userId)] }
                ]
              }
            }
          }
        ],
        as: 'favoriteInfo'
      }
    },
    {
      $unwind: {
        path: '$favoriteInfo',
        preserveNullAndEmptyArrays: true // Include dishes even if they are not in the favorite collection
      }
    },
    {
      $project: {
        dish: {
          _id: '$_id',
          is_active: '$is_active',
          discount: '$discount',
          created_at: '$created_at',
          name: '$name',
          price: '$price',
          description: '$description',
          image: '$image',
          category: '$category'
        },
        favoriteInfo: 1
      }
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
  getPopularDishes,
  searchDishesByFullTextSearch,
  createDishes,
  createDish,
  updateDish,
  deleteDish,
  validateDishesById
}
