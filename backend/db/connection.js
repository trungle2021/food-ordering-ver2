const mongoose = require('mongoose')

const DB = process.env.DATABASE.replace(
  '<DATABASE_PASSWORD>',
  process.env.DATABASE_PASSWORD
).replace('<DATABASE_NAME>', process.env.DATABASE_NAME)

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })

const connection = mongoose.connection

connection.on('open', () => console.log('Database connection successfully'))
connection.on('error', () => console.log('Database connection failed'))

module.exports = connection
