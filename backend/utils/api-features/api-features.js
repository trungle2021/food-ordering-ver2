const AppError = require('../../utils/error/app-error');

class ApiFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    const queryObject = this.prepareQueryObject();
    this.query = this.query.find(queryObject);
    return this;
  }

  sort() {
    let sortBy;
    if (this.queryString.sort) {
      if (typeof this.queryString.sort === 'string') {
        sortBy = this.queryString.sort;
      } else {
        sortBy = this.queryString.sort.join(' ');
      }
    } else {
      sortBy = 'created_at';
    }
    this.query = this.query.sort(sortBy);
    return this;
  }

  limitFields() {
    let selectFields;
    const excludedVersionField = '-__v';
    if (this.queryString.fields) {
      selectFields = this.queryString.fields.split(',').join(' ');
    } else {
      selectFields = excludedVersionField;
    }
    this.query = this.query.select(selectFields);
    return this;
  }

  prepareQueryObject() {
    let queryObject = { ...this.queryString };
    queryObject = this.excludeFields(queryObject);
    const queryString = JSON.stringify(queryObject);
    const queryStringReplaced = queryString.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    return JSON.parse(queryStringReplaced);
  }

  excludeFields(queryObject, fields = ['page', 'limit', 'fields', 'sort']) {
    fields.forEach((field) => delete queryObject[field]);
    return queryObject;
  }
}

module.exports = ApiFeatures;
