const paginate = async (model, query, page, limit) => {
    const totalCount = await model.countDocuments(query)
    const totalPages = Math.ceil(totalCount / limit)
    const skip = (page - 1) * limit;

    const results = await model.find(query).skip(skip).limit(limit);
  
    return {
      totalCount,
      totalPages,
      currentPage: page,
      results,
    };
}

module.exports = paginate;
