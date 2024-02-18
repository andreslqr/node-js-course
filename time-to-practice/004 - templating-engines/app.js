const express = require('express')
const bodyParser = require('body-parser')
const { create } = require('express-handlebars')

const users = []

const app = express()

const hbs = create({
    extname: 'hbs',
    defaultLayout: 'app'
})

app.engine('.hbs', hbs.engine)

app.set('view engine', '.hbs')

app.use(bodyParser.urlencoded({
    extended: false
}))

app.get('/', (req, res, next) => {
    return res.render('home', {
        metaTitle: 'Home'
    })
})

app.post('/', (req, res, next) => {
    users.push({
        name: req.body.name
    })

    return res.redirect('/users')
})

app.get('/users', (req, res, next) => {
    return res.render('users', {
        users,
        hasUsers: users.length > 0
    })
})

app.listen(3000)