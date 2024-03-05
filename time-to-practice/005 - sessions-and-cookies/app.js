const express = require('express')
const bodyParser = require('body-parser')
var session = require('express-session')

const app = express()

app.set('view engine', 'ejs')
app.set('views', 'views')

app.use(bodyParser.urlencoded({
    extended: false
}))

app.use(session({
    secret: 'secretkeybecauseisverysecret',
    resave: false,
    saveUninitialized: true
}))

app.get('/', (req, res, next) => {
    return res.render('home', {
        user: req.session.user
    })
})

app.get('/login', (req, res, next) => {
    return res.render('login')
})

app.post('/login', (req, res, next) => {
    req.session.user = {
        'name': 'John Doe',
        'email': req.body.email
    }

    return res.redirect('/')
})


app.listen(3000)





