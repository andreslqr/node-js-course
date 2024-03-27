const express = require('express')
const bodyParser = require('body-parser')
const User = require('./models/user')
var session = require('express-session')
var MongoDBStore = require('connect-mongodb-session')(session);

const { publicPath, basePath } = require('./helpers/path')
const errorsController = require('./controllers/errors')
const mongoose = require('mongoose')

const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')

const store = new MongoDBStore({
    uri: process.env.MONGODB_URI
})

const app = express()


app.locals.basedir = basePath()

app.set('view engine', 'ejs')
app.set('views', 'views')

app.use(bodyParser.urlencoded({
    extended: false
}))

app.use(express.static(publicPath()))

app.use(session({
    secret: process.env.APP_KEY,
    resave: false,
    saveUninitialized: true,
    store
}))

app.use((req, res, next) => {
    res.locals.authenticated = req.session.user

    return next()
})

app.use(async (req, res, next) => {

    if(res.locals.authenticated)
        req.user = await User.findById(req.session.user._id)
    next()
})


app.use('/admin', adminRoutes)
app.use(shopRoutes)


app.use(errorsController.error404)

mongoose.connect(process.env.MONGODB_URI)
    .then(result =>  app.listen(process.env.APP_PORT, () => console.log(`App listening in http://localhost:${process.env.APP_PORT}`)))
    .catch(err => console.log(err))





