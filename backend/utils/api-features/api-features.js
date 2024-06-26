const AppError = require('../../utils/error/app-error')

class ApiFeatures {
  constructor (query, queryString) {
    this.query = query
    this.queryString = queryString
  }

  excludeFields (queryObject, fields = ['page', 'limit', 'fields', 'sort']) {
    fields.forEach((field) => delete queryObject[field])
    return queryObject
  }

  prepareQueryObject () {
    let queryObject = { ...this.queryString }
    queryObject = this.excludeFields(queryObject)
    const queryString = JSON.stringify(queryObject)
    return queryString.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`)
  }

  filter () {
    const queryStringReplaced = this.prepareQueryObject()
    this.query = this.query.find(JSON.parse(queryStringReplaced))
    return this
  }

  async getPaginationInfo () {
    const queryStringReplaced = this.prepareQueryObject()
    const Model = this.query.model
    const totalItems = await Model.countDocuments(JSON.parse(queryStringReplaced))
    const limit =
            (this.queryString.limit && Number(this.queryString.limit)) || 10
    const totalPages = Math.ceil(totalItems / limit)

    return { totalItems, totalPages }
  }

  sort () {
    let sortBy
    if (this.queryString.sort) {
      sortBy = this.queryString.sort.split(',').join(' ')
    } else {
      sortBy = 'created_at'
    }
    this.query = this.query.sort(sortBy)
    return this
  }

  limitFields () {
    let selectFields
    const excludedVersionField = '-__v'
    if (this.queryString.fields) {
      selectFields = this.queryString.fields.split(',').join(' ')
    } else {
      selectFields = excludedVersionField
    }
    this.query = this.query.select(selectFields)
    return this
  }

  paginate () {
    if (this.queryString.page <= 0) {
      throw new AppError('Page number must be greater or equal 1', 400)
    }
    const page = (this.queryString.page && Number(this.queryString.page)) || 1
    const limit =
            (this.queryString.limit && Number(this.queryString.limit)) || 10
    const skip = (page - 1) * limit
    this.query = this.query.skip(skip).limit(limit)

    return this
  }
}

module.exports = ApiFeatures
