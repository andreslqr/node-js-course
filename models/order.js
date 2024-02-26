const sequelize = require('./../database')
const { DataTypes } = require('sequelize')

const Order = sequelize.define('Order', {
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    }
})

module.exports = Order