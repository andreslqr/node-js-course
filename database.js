const { Sequelize } = require('sequelize')

const sequelize = new Sequelize({
    dialect: 'mysql',
    database: 'node_js_course',
    username: 'root',
    password: null,
    host: 'localhost'
})

module.exports = sequelize