const sequelize = require('./../database')
const { DataTypes } = require('sequelize')

const ShoppingCart = sequelize.define('ShoppingCart', {
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    }
})

module.exports = ShoppingCart