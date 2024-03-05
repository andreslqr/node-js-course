# Mongoose

Mongoose provides a straight-forward, schema-based solution to model your application data. It includes built-in type casting, validation, query building, business logic hooks and more, out of the box.

## Defining models

The models are a representation of MongoDB documents, with defined but not stricted schemas:

```js
const { Schema, model } = require('mongoose') 


const schema = new Schema({
    sku: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: false
    }
})

const Product = model('Product', schema)

```

## Retrieving docs

```js
const products = Products.find()
```


## Creating docs

```js
new Product({
        title: 'awesome title',
        sku: 'fgrarq',
        price: 99.99
    }).save()
```

## Updating docs

```js
const product = await Product.findById(req.params.productId)

product.set({
    title: "A second awesome title"
}).save()
```

## Deleting docs

```js
await Product.findByIdAndDelete(req.params.productId)
```

## Defining relations?

Mongoose allows to define some kind of relations, using special data types

```js
const schema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User' // the name of the user model defined in the model('Product', schema) function 
    }
})


const Product = model('Product', schema)

const user = await Product.findOne().populate('userId')
```