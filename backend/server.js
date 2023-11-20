const app = require('./app');
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config({path:'./config.env'})

const DB = process.env.DATABASE.replace('<DATABASE_PASSWORD>',process.env.DATABASE_PASSWORD);

mongoose.connect(DB,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useFindAndModify:false,
    useUnifiedTopology:true
}).then(()=> {
    console.log('Database connection successfully');
}).catch((err) => console.log(err));


const PORT = process.env.PORT || 1338
app.listen(PORT, () => {
  console.log('Listening on port: ' + PORT);
})
