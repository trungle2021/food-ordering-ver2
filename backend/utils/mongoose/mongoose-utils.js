const mongoose = require('mongoose')

const convertToObjectId = async (idString) => {
  return mongoose.Types.ObjectId(idString)
}

module.exports = {
  convertToObjectId
}
