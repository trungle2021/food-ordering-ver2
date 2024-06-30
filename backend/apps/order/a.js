const getOrderHistoryPipeline = [
  {
    $match: {
      user: userIdConverted,
    },
  },
  {
    $lookup: {
      from: "orderdetails",
      localField: "_id",
      foreignField: "order",
      as: "order_details",
    },
  },
  {
    $unwind: "$order_details",
  },
  {
    $lookup: {
      from: "dishes",
      localField: "order_details.dish",
      foreignField: "_id",
      as: "order_details.dish",
    },
  }, // after lookup dish object become dish array
  {
    $unwind: "$order_details.dish",
  }, // convert dish array into dish object

  {
    $match: {
      "order_details.dish.name": { $regex: dishName, $options: "i" },
    },
  },
  {
    $group: {
      _id: '$_id',
      order_status: { $first: '$order_status' },
      payment_status: { $first: '$payment_status' },
      payment_method: { $first: '$payment_method' },
      order_total: { $first: '$order_total' },
      time_completed: { $first: '$time_completed' },
      created_at: { $first: '$created_at' },
      updated_at: { $first: '$updated_at' },
      user: { $first: '$user' },
      order_date: { $first: '$order_date' },
      shipping_address: { $first: '$shipping_address' },
      order_details: { $push: '$order_details' },
      __v: { $first: '$__v' }
    }
  }
];
