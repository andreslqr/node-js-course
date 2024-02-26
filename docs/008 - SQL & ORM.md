# SQL & ORM

Using MySQL or any other Query Language can be difficult in Node.js and any other programming language, thats the reason why the ORM exists, a ORM is a Object Relation Map, an elegant way to interact with databases without leaving the main programming language

For Node.js the must popular library is [Sequilize](https://sequelize.org/)

## Creating a connection with Sequelize

```js
const { Sequelize } = require('sequelize')

const sequelize = new Sequelize({
    dialect: 'mysql',
    database: 'node_js_course',
    username: 'root',
    password: null,
    host: 'localhost'
})

module.exports = sequelize
```

## Define a model

A model is a reprensentation of a record from a table, this allows abstract the logic behind data in business code:

```js
const { DataTypes } = require('sequelize')

const Product = sequelize.define('Product', {
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    sku: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    imageUrl: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    }
})
```

### Creating records

```js
Product.create({
    title: 'Awesome product',
    sku: '4523342',
    price: 9.99,
    imageUrl: 'http://.png',
})

```

### Queryng records

```js
const { Op } = require("sequelize");

Product.findAll({
    where: {
        price: {
            Op.between: [5, 10]
        }
    }
})

Product.findByPk(1)
```

### Deleting records

```js
Product.destroy({
  where: {
    id: 1
  }
});

const product = await Product.findByPk(1)

product.destroy()
```