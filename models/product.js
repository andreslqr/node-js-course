const Model = require('./model')

class Product extends Model {
    static collectionName = 'products'
}

module.exports = Product