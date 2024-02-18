const express = require('express')
const bodyParser = require('body-parser')
const { viewsPath } = require('./../../helpers/path')
const path = require('path')


const app = express()

app.use(bodyParser.urlencoded({extended: false}))

app.use(express.static(path.join(__dirname, 'public')))


app.get('/', (req, res, next) => {
    return res.sendFile(path.join(__dirname, 'views', 'index.html'))
})

app.get('/users', (req, res, next) => {
    return res.sendFile(path.join(__dirname, 'views', 'users', 'index.html'))
})


app.listen(3000)