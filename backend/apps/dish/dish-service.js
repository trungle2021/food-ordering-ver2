const Dish = require('./dish-model');
const Order = require('../order/order-model');
const StockService = require('../stock/stock-service');
const ApiFeatures = require('../../utils/api-features/api-features');
const { COMPLETED } = require('../../constant/order-status');
const { convertToObjectId } = require('../../utils/mongoose/mongoose-utils');
const paginateAggregate = require('../../utils/api-features/paginateAggregate');

const getDishes = async (userId, queryString) => {
  const modifiedQueryString = { ...queryString };
  const apiFeatures = new ApiFeatures(Dish.find(), modifiedQueryString);
  const preparedQuery = apiFeatures.prepareQueryObject();
  // Handle both single and multiple category names
  let categoryNames = preparedQuery['category.name'];
  if (categoryNames) {
    categoryNames = Array.isArray(categoryNames) ? categoryNames : [categoryNames];
  }
  const aggregatePipeline = [
    {
      $lookup: {
        from: 'categories',
        localField: 'category',
        foreignField: '_id',
          as: 'category'
        }
    },
    { $unwind: '$category' },
   // Initial match stage for category if provided
   ...(categoryNames ? [{
    $match: {
      'category.name': { $in: categoryNames }
      }
    }] : []),
  // Get category information

  // Get sales information
  {
    $lookup: {
      from: "orderdetails",
      let: { dishId: "$_id" },
      pipeline: [
        {
          $match: {
            $expr: { $eq: ["$dish", "$$dishId"] }
          }
        },
        {
          $lookup: {
            from: "orders",
            localField: "order",
            foreignField: "_id",
            as: "order"
          }
        },
        {
          $match: {
            "order.order_status": COMPLETED
          }
        },
        {
          $group: {
            _id: null,
            itemSold: { $sum: "$quantity" }
          }
        }
      ],
      as: "salesInfo"
      }
  },

  // Add computed fields
  {
  $addFields: {
    itemSold: { 
      $ifNull: [{ $first: "$salesInfo.itemSold" }, 0] 
      }
    }
  },
     // Get favorite information if userId provided
     ...(userId ? [{
      $lookup: {
        from: 'favorites',
        let: { dishId: '$_id' },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ['$dish', '$$dishId'] },
                  { $eq: ['$user', await convertToObjectId(userId)] },
                ],
              },
            },
          },
        ],
        as: 'favoriteInfo',
      }
    }] : []),

    {
      $project: {
        _id: 1,
        name: 1,
        description: 1,
        price: 1,
        image: 1,
        is_active: 1,
        discount: 1,
        created_at: 1,
        updated_at: 1,
        itemSold: { 
          $ifNull: [{ $first: "$salesInfo.itemSold" }, 0] 
        },
        isFavorite: {
          $cond: {
            if: { $gt: [{ $size: "$favoriteInfo" }, 0] },
            then: true,
            else: false
          }
        },
        category: {
          name: 1,
          description: 1,
        },
      },
    },
  ];


  // Apply sorting
  if (modifiedQueryString.sort) {
    aggregatePipeline.push({ 
      $sort: modifiedQueryString.sort === 'popular' 
        ? { itemSold: -1 } 
        : apiFeatures.sort().query.options.sort 
    });
  }

  // Apply field limiting
  if (modifiedQueryString.fields) {
    const projection = apiFeatures.limitFields().query._fields;
    aggregatePipeline.push({ $project: projection });
  }

  // Apply pagination
  const page = parseInt(modifiedQueryString.page, 10) || 1; // Default to page 1
  const limit = parseInt(modifiedQueryString.limit, 10) || 10; // Default to limit 10

  // Use the paginate function with the aggregate pipeline
  const paginatedDishes = await paginateAggregate(Dish, aggregatePipeline, page, limit);

  return paginatedDishes; // Return the paginated result with metadata
};

const getDish = async (queryString) => {
  return await Dish.findOne(queryString);
};


const searchDishesByFullTextSearch = async (value, page = 1, limit = 10, userId) => {
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
                  maxEdits: 1,
                },
                path: 'name',
              },
            },
            {
              text: {
                query: value,
                path: 'description',
              },
            },
          ],
          minimumShouldMatch: 1,
        },
      },
    },
    // Join with orderDetails to get total quantity sold
    {
      $lookup: {
        from: "orderdetails",
        let: { dishId: "$_id" },
        pipeline: [
            {
              $match: {
                $expr: { $eq: ["$dish", "$$dishId"] }
              }
            },
            {
              $lookup: {
                from: "orders",
                localField: "order",
                foreignField: "_id",
                as: "order"
              }
            },
            {
              $match: {
                "order.order_status": COMPLETED
              }
            },
            {
              $group: {
                _id: null,
                itemSold: { $sum: "$quantity" }
              }
            }
          ],
          as: "salesInfo"
      }
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
                  { $eq: ['$user', await convertToObjectId(userId)] },
                ],
              },
            },
          },
        ],
        as: 'favoriteInfo',
      },
    },
    {
      $project: {
        _id: 1,
        name: 1,
        description: 1,
        price: 1,
        image: 1,
        category: 1,
        itemSold: { 
          $ifNull: [{ $first: "$salesInfo.itemSold" }, 0] 
        },
        // rating: {
        //   average: { $ifNull: [{ $first: "$ratingInfo.averageRating" }, 0] },
        //   count: { $ifNull: [{ $first: "$ratingInfo.totalReviews" }, 0] }
        // },
        isFavorite: {
          $cond: {
            if: { $gt: [{ $size: "$favoriteInfo" }, 0] },
            then: true,
            else: false
          }
        }
      }
    }
  ];

  // Use paginateAggregate instead of Dish.aggregate
  const paginatedResult = await paginateAggregate(Dish, pipeline, page, limit);

  return paginatedResult;
};

const createDishes = async (dishes) => {
  return await Dish.insertMany(dishes);
};

const createDish = async (dish) => {
  const createdDish = await Dish.create(dish);
  await StockService.upsertStock({ dishId: createdDish._id });
  return createdDish;
};

const updateDish = async (dishId, updates) => {
  return await Dish.findByIdAndUpdate(dishId, updates, { new: true });
};

const deleteDish = async (dishId) => {
  return await Dish.findByIdAndDelete(dishId);
};

const validateDishesById = async (orderItems) => {
  const dishIds = orderItems.map((item) => item.dish_id);
  const dishes = await Dish.find({ _id: { $in: dishIds } });

  if (dishes.length !== dishIds.length) {
    return {
      isValid: false,
      invalidDish: dishIds.filter((id) => !dishes.map((dish) => dish._id).includes(id)),
    };
  }
  return { isValid: true };
};


module.exports = {
  getDishes,
  getDish,
  searchDishesByFullTextSearch,
  createDishes,
  createDish,
  updateDish,
  deleteDish,
  validateDishesById,
};