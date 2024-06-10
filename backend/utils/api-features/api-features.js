class ApiFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

   filter() {
    const queryObject = { ...this.queryString };
    const excludeFields = ["page", "limit", "fields", "sort"];
    excludeFields.forEach((field) => delete queryObject[field]);
    this.query = this.query.find(queryObject);
    return this;
  }

   sort() {
    let sortBy;
    if (this.queryString.sort) {
      sortBy = this.queryString.sort.split(",").join(" ");
    } else {
      sortBy = "created_at";
    }
    this.query = this.query.sort(sortBy);
    return this;
  }

   limitFields() {
    let selectFields;
    const excludedVersionField = "-__v";
    if (this.queryString.fields) {
      selectFields = this.queryString.fields.split(",").join(" ");
    } else {
      selectFields = excludedVersionField;
    }
    this.query = this.query.select(selectFields);
    return this;
  }

  async paginate() {
    if (this.queryString.page <= 0) {
      throw new AppError("Page number must be greater or equal 1", 400);
    }
    const page = (this.queryString.page && Number(this.queryString.page)) || 1;
    const limit =
      (this.queryString.limit && Number(this.queryString.limit)) || 10;
    const skip = (page - 1) * limit;
   // Counting documents
   const totalCount = await this.query.countDocuments();

   // Updating query with pagination
   this.query = this.query.skip(skip).limit(limit);

   // Returning both query result and total count
   return {
     queryResult: await this.query,
     totalCount: totalCount
   };
  }
}

module.exports = ApiFeatures;
