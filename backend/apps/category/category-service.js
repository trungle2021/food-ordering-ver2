const ApiFeatures = require('../../utils/api-features/api-features');
const Category = require('./category-model');

const getCategories = async (queryString) => {
  const features = new ApiFeatures(Category.find(), queryString)
    .filter()
    .limitFields()
    .sort()
  return await features.query;
};

const getCategory = async (queryString) => {
  return await Category.findOne(queryString).populate({ path: 'dish', select: 'name -_id' });
};

const createCategory = async (category) => {
  return await Category.create(category);
};

const createCategories = async (categories) => {
  return await Category.insertMany(categories);
};

const updateCategory = async (filter, update) => {
  return await Category.findOneAndUpdate(filter, update, { returnDocument: 'after' });
};

const deleteCategory = async (filter) => {
  return await Category.deleteOne(filter);
};

module.exports = {
  getCategories,
  getCategory,
  createCategories,
  createCategory,
  updateCategory,
  deleteCategory,
};
