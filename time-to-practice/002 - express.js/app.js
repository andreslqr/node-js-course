const express = require('express')

const app = express()

app.get('/users', (req, res, next) => {
    res.send('<h1> Users page </h1>')
})

app.use((req, res, next) => {
    console.log('first middleware')
    next()
})

app.use((req, res, next) => {
    console.log('second middleware')
    res.send('<h1> end </h1>')
})

app.listen(3000)