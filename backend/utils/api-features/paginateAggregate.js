const paginateAggregate = async (model, pipeline, page = 1, limit = 10) => {
  const skip = (page - 1) * limit;

  // Use $facet to get both the total count and the paginated results in one aggregation
  const results = await model.aggregate([
    ...pipeline,
    {
      $facet: {
        totalCount: [{ $count: 'count' }],
        paginatedResults: [
          { $skip: skip },
          { $limit: limit }
        ]
      }
    }
  ]);

  const totalDocuments = results[0]?.totalCount[0]?.count || 0;
  const totalPages = Math.ceil(totalDocuments / limit);

  return {
    totalCount: totalDocuments,
    totalPages,
    currentPage: page,
    results: results[0]?.paginatedResults || [],
  };
};

module.exports = paginateAggregate;
