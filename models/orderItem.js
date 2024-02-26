const sequelize = require('./../database')
const { DataTypes } = require('sequelize')

const orderItem = sequelize.define('orderItem', {
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    quantity: {
        type: DataTypes.INTEGER
    }
})

module.exports = orderItem