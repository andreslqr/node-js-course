const sequelize = require('./../database')
const { DataTypes } = require('sequelize')

const ShoppingCartItem = sequelize.define('ShoppingCartItem', {
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    quantity: {
        type: DataTypes.INTEGER
    }
})

module.exports = ShoppingCartItem