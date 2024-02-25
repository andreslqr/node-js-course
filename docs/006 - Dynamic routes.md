# Dynamic routes

Express.js allows to create dynamic routes using parameters, this is usefull for manage ids, slugs from records, for example an id from a product or a slug from a blog post


```js
const express = require('express')

const app = express()

// POST => /products/432 
app.post('/products/:productId', (req, res, next) => {
    const productId = req.params.productId
    console.log(productId) // 432
})

// POST => /blog/my-awesome-post
app.get('/blog/:postId', (req, res, next) => {
    const postId = req.params.postId
    console.log(postId) // 'my-awesome-post'
})
```

Also there are optional parameters, there are passed to express via [the query string](https://en.wikipedia.org/wiki/Query_string)

```js
const express = require('express')

const app = express()

// GET => /products?search=books
app.get('/products', (req, res, next) => {
    const search = req.query.search
    const filter = req.query.filter

    console.log(search) // 'books'
    console.log(filter) // undefined
    
})