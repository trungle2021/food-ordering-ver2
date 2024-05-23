const Stock = require('./stock-model')

const checkStock = async (dishId, quantity) => {
    const stock = await Stock.find({dish: dishId})
    if(stock.quantity < quantity){
        return false
    }
    return true
}

module.exports = {
    checkStock
}