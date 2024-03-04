const express = require('express')
const bodyParser = require('body-parser')
const User = require('./models/user')

const { publicPath, viewsPath, basePath } = require('./helpers/path')
const errorsController = require('./controllers/errors')
const { connection } = require('./database')

const adminRoutes = require('./routes/admin')
//const shopRoutes = require('./routes/shop')

const app = express()


app.locals.basedir = basePath()

app.set('view engine', 'ejs')
app.set('views', 'views')

app.use(bodyParser.urlencoded({
    extended: false
}))

app.use(express.static(publicPath()))

app.use(async (req, res, next) => {
    let data = {
        name: 'Jhon Doe',
        email: 'a@mail.com'
    }

    let user = await User.findOneByFilter(data)

    if(! user) {
        user = await User.make(data).save()
    }

    req.user = user

    next()
})


app.use('/admin', adminRoutes)
//app.use(shopRoutes)


app.use(errorsController.error404)

connection(() => {
    app.listen(3000)
})





