const catchAsyncHandler = require('../../utils/catch-async/catch-async-handler')

const CategoryService = require('./category-service')

const getCategories = catchAsyncHandler(async (req, res) => {
  const categories = await CategoryService.getCategories()
  return res.status(200).json({
    status: 'success',
    data: categories
  })
})

const getCategory = catchAsyncHandler(async (req, res, next) => {
  const { id } = req.params
  const category = await CategoryService.getCategory(id)
  if (!category) {
    return res.status(404).json({
      status: 'fail',
      data: null
    })
  }
  return res.status(200).json({
    status: 'success',
    data: category
  })
})

const createCategories = catchAsyncHandler(async (req, res, next) => {
  const body = req.body
  const categories = await CategoryService.createCategories(body)
  if (!categories) {
    return res.status(404).json({
      status: 'fail',
      data: null
    })
  }
  return res.status(200).json({
    status: 'success',
    data: categories
  })
})

const createCategory = catchAsyncHandler(async (req, res, next) => {
  const body = req.body
  const category = await CategoryService.createCategory(body)
  return res.status(200).json({
    status: 'success',
    data: category
  })
})
const updateCategory = catchAsyncHandler(async (req, res, next) => {
  const filter = {
    _id: req.params.id
  }
  const body = req.body
  const category = await CategoryService.updateCategory(filter, body)
  return res.status(200).json({
    status: 'success',
    data: category
  })
})

const deleteCategory = catchAsyncHandler(async (req, res, next) => {})

module.exports = {
  getCategories,
  getCategory,
  createCategories,
  createCategory,
  updateCategory,
  deleteCategory
}
