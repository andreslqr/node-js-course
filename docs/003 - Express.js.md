# Express.js

Express.js it's a minimal but powerfull framework for web development, offers a lot of tools and ways to extend the features from http basis from node.js

it use a middleware architecture, (plug for new features)

the main features about the middleares are the req, res and next function variables:

```js

const express = require('express')

const app = express()

app.use((req, res, next) => {

    // storage all the current request data, body, headers, etc
    req.body // example body request

    // interact with the client for a response, send data, files, etc
    res.send({
        code: 200,
        message: "successfull request!"
    }) // use instead of next

    // continue throw the funnel of requests
    next(); // use instead of res


})

```

Express.js allows to filter request paths, urls and general routing

```js

const express = require('express')

const app = express()
const router = express.Router() // create a router for export

app.get() // catch GET requests
router.get() // same as

app.post() // catch POST requests
router.post() // same as

app.use() // catch any request
router.use() // same as


```

Express.js allows serve static files as html, css, js, images etc:

```js
const express = require('express')

const app = express()

app.use(express.static('public/')) // define a folder as public for everyone

app.use((req, res, next) => {
    res.status(404).sendFile('index.html') // send a html file
})


```