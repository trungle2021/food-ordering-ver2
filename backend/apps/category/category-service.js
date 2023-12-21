const ApiFeatures = require('../../utils/api-features/api-features')
const Category = require('./category-model')

const getCategories = async (queryString) => {
  const features = new ApiFeatures(Category.find(), queryString)
    .filter()
    .limitFields()
    .sort()
    .paginate()
  return await features.query
}

const getCategory = async (id) => {
  return await Category.findById(id).populate({ path: 'dish', select: 'name -_id' })
}

const createCategory = async (category) => {
  return await Category.create(category)
}

const createCategories = async (categories) => {
  return await Category.insertMany(categories)
}

const updateCategory = async (filter, update) => {
  return await Category.findOneAndUpdate(filter, update, { new: true })
}

const deleteCategory = async (category) => {

}

module.exports = {
  getCategories,
  getCategory,
  createCategories,
  createCategory,
  updateCategory,
  deleteCategory
}
