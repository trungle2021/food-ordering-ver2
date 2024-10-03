const Dish = require('./dish-model');
const Order = require('../order/order-model');
const ApiFeatures = require('../../utils/api-features/api-features');
const { COMPLETED } = require('../../constant/order-status');
const { convertToObjectId } = require('../../utils/mongoose/mongoose-utils');
const paginateAggregate = require('../../utils/api-features/paginateAggregate');

const getDishes = async (userId, queryString) => {
  const modifiedQueryString = { ...queryString };
  const apiFeatures = new ApiFeatures(Dish.find(), modifiedQueryString);
  const preparedQuery = apiFeatures.prepareQueryObject();
  const aggregatePipeline = [
    {
      $lookup: {
        from: 'categories',
        localField: 'category',
        foreignField: '_id',
        as: 'category',
      },
    },
    { $unwind: '$category' },
    {
      $match: {
        ...preparedQuery,
      },
    },
    {
      $lookup: {
        from: 'orderdetails',
        localField: '_id',
        foreignField: 'dish',
        as: 'orderDetails',
      },
    },
    {
      $addFields: {
        totalQuantity: { $sum: '$orderDetails.quantity' },
      },
    },
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
        category: {
          name: 1,
          description: 1,
        },
        totalQuantity: 1,
      },
    },
  ];

  if (userId) {
    aggregatePipeline.push({
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
    });
    aggregatePipeline.push({
      $addFields: {
        favoriteInfo: {
          $cond: {
            if: { $eq: [{ $size: '$favoriteInfo' }, 0] },
            then: null,
            else: { $arrayElemAt: ['$favoriteInfo', 0] },
          },
        },
      },
    });
  }

  // Apply sorting
  if (modifiedQueryString.sort) {
    const sortOrder = apiFeatures.sort().query.options.sort;
    aggregatePipeline.push({ $sort: sortOrder });
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

const getPopularDishes = async (userId, queryString) => {
  const page = parseInt(queryString.page) || 1;
  const limit = parseInt(queryString.limit) || 10;

  const pipeline = [
    {
      $match: {
        order_status: COMPLETED,
      },
    },
    {
      $lookup: {
        from: 'orderdetails',
        localField: '_id',
        foreignField: 'order',
        as: 'orderDetails',
      },
    },
    {
      $addFields: {
        totalQuantity: { $sum: '$orderDetails.quantity' },
      },
    },
    { $sort: { totalQuantity: -1 } },
    {
      $lookup: {
        from: 'dishes',
        localField: '_id',
        foreignField: '_id',
        as: 'dish',
      },
    },
    { $unwind: '$dish' },
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
        category: {
          name: 1,
          description: 1,
        },
        totalQuantity: 1,
      },
    },
  ];

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
        $unwind: {
          path: '$favoriteInfo',
          preserveNullAndEmptyArrays: true,
        },
      }
    );
  }

  const paginatedResult = await paginateAggregate(Order, pipeline, page, limit);

  if (paginatedResult.results.length === 0) {
    console.log('Popular dishes is empty, fetching 5 random dishes');
    const fallbackPipeline = [
      { $sample: { size: limit } },
      {
        $project: {
          dish: '$$ROOT',
          totalQuantity: 0,
        },
      },
    ];

    if (userId) {
      fallbackPipeline.push(
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
          $unwind: {
            path: '$favoriteInfo',
            preserveNullAndEmptyArrays: true,
          },
        }
      );
    }

    const fallbackResult = await Dish.aggregate(fallbackPipeline);
    return {
      results: fallbackResult,
      pagination: {
        totalCount: fallbackResult.length,
        limit: 5,
        page: 1,
        totalPages: 1,
      },
    };
  }

  return paginatedResult;
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
    {
      $lookup: {
        from: 'orderdetails',
        let: { dishId: '$_id' },
        pipeline: [
          {
            $match: {
              $expr: { $eq: ['$dish', '$$dishId'] }
            }
          },
          {
            $group: {
              _id: null,
              totalQuantity: { $sum: '$quantity' }
            }
          }
        ],
        as: 'orderDetails'
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
      $unwind: {
        path: '$favoriteInfo',
        preserveNullAndEmptyArrays: true, // Include dishes even if they are not in the favorite collection
      },
    },
    {
      $project: {
        _id: 1,
        is_active: 1,
        discount: 1,
        created_at: 1,
        name: 1,
        price: 1,
        description: 1,
        image: 1,
        category: 1,
        favoriteInfo: 1,
        totalQuantity: {
          $ifNull: [{ $arrayElemAt: ['$orderDetails.totalQuantity', 0] }, 0]
        }
      },
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
  return await Dish.create(dish);
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
  getPopularDishes,
  searchDishesByFullTextSearch,
  createDishes,
  createDish,
  updateDish,
  deleteDish,
  validateDishesById,
};