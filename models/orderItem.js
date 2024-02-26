const sequelize = require('./../database')
const { DataTypes } = require('sequelize')

const OrderItem = sequelize.define('OrderItem', {
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    quantity: {
        type: DataTypes.INTEGER
    }
})

module.exports = OrderItem