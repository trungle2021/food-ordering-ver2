const catchAsyncHandler = require('../../utils/catch-async/catch-async-handler')

const DishService = require('./dish-service')

const getDishes = catchAsyncHandler(async (req, res) => {
  const queryString = req.query
  const dishes = await DishService.getDishes(queryString)
  return res.status(200).json({
    status: 'success',
    data: dishes
  })
})

const searchDishesByFullTextSearch = catchAsyncHandler(async (req, res) => {
  let queryString = req.query
  const { keyword, limit } = queryString
  if (!keyword) {
    return res.status(400).json({
      status: 'fail',
      message: 'Missing "keyword" parameter in query string'
    })
  }
  if (limit) {
    const parsedLimit = parseInt(limit)
    if (isNaN(parsedLimit)) {
      return res.status(400).json({
        status: 'fail',
        message: 'Invalid "limit" parameter in query string'
      })
    }
    queryString = { ...queryString, limit: parsedLimit }
  }
  if(keyword.length == 1){
    delete queryString.keyword
    const regexPattern = '^' + keyword; // Prepend '^' to the search string to search product name start by keyword
    const regex = new RegExp(regexPattern, 'i');
    queryString = {...queryString, name: regex}
    // search by regex
    const dishes = await DishService.getDishes(queryString)
    return res.status(200).json({
      status: 'success',
      data: dishes
    })
  }
  const dishes = await DishService.searchDishesByFullTextSearch(queryString.keyword, queryString.limit)
  console.log('dishes', dishes)
  return res.status(200).json({
    status: 'success',
    data: dishes
  })
})

const getDish = catchAsyncHandler(async (req, res, next) => {
  const { id } = req.params
  const dish = await DishService.getDish(id)
  if (!dish) {
    return res.status(404).json({
      status: 'fail',
      data: null
    })
  }
  return res.status(200).json({
    status: 'success',
    data: dish
  })
})

const getPoplularDishes = catchAsyncHandler(async (req, res, next) => {
  const queryString = { ...req.query }
  const result = await DishService.getPoplularDishes(queryString)
  return res.status(200).json({
    status: 'success',
    data: result
  })
})
const createDishes = catchAsyncHandler(async (req, res, next) => {
  const listDishes = req.body
  const dishes = await DishService.createDishes(listDishes)
  return res.status(200).json({
    status: 'success',
    data: dishes
  })
})
const createDish = catchAsyncHandler(async (req, res, next) => { })
const updateDish = catchAsyncHandler(async (req, res, next) => { })
const deleteDish = catchAsyncHandler(async (req, res, next) => { })

module.exports = {
  getDishes,
  searchDishesByFullTextSearch,
  getDish,
  getPoplularDishes,
  createDishes,
  createDish,
  updateDish,
  deleteDish
}
