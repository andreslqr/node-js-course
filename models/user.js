const Model = require('./model')

class User extends Model {
    static collectionName = 'users'
}

module.exports = User