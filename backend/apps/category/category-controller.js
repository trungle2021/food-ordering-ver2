const catchAsyncHandler = require('../../utils/catch-async/catch-async-handler')

const CategoryService = require('./category-service')

const getCategories = catchAsyncHandler(async (req, res) => {
  const queryString = { ...req.query }
  const categories = await CategoryService.getCategories(queryString)
  return res.status(200).json({
    status: 'success',
    data: categories
  })
})

const getCategory = catchAsyncHandler(async (req, res, next) => {
  const { categoryId } = req.params
  const category = await CategoryService.getCategory({ _id: categoryId })
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
  const payload = req.body
  const categories = await CategoryService.createCategories(payload)
  if (!categories) {
    return res.status(404).json({
      status: 'fail',
      data: null
    })
  }
  return res.status(201).json({
    status: 'success',
    data: categories
  })
})

const createCategory = catchAsyncHandler(async (req, res, next) => {
  const payload = req.body
  const category = await CategoryService.createCategory(payload)
  return res.status(200).json({
    status: 'success',
    data: category
  })
})
const updateCategory = catchAsyncHandler(async (req, res, next) => {
  const { categoryId } = req.body
  const filter = {
    _id: categoryId
  }
  const payload = req.body
  const category = await CategoryService.updateCategory(filter, payload)
  return res.status(200).json({
    status: 'success',
    data: category
  })
})

const deleteCategory = catchAsyncHandler(async (req, res, next) => {
  const { categoryId } = req.params
  const filter = {
    _id: categoryId
  }
  const result = await CategoryService.deleteCategory(filter)
  if (!result) {
    return res.status(404).json({
      status: 'fail',
      message: 'Delete category failed'
    })
  }
  return res.status(200).json({
    status: 'success',
    data: 'Delete category successfully'
  })
})

module.exports = {
  getCategories,
  getCategory,
  createCategories,
  createCategory,
  updateCategory,
  deleteCategory
}
