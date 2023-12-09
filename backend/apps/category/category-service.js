const Category = require('./category-model')

const getCategories = async () => {
  return await Category.find({}).populate({ path: 'dish', select: 'name -_id' })
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
  console.log(update)
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
