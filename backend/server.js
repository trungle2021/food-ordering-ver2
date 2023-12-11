const dotenv = require('dotenv')
dotenv.config({ path: './config.env' })
// require('./db/connection')
const app = require('./app')

const PORT = process.env.PORT || 1337
app.listen(PORT, () => {
  console.log('Listening on port: ' + PORT)
})
