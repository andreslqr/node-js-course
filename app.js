const express = require('express')
const bodyParser = require('body-parser')

const { publicPath, viewsPath, basePath } = require('./helpers/path')
const errorsController = require('./controllers/errors')

const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')

const sequelize = require('./database')

const app = express()

app.locals.basedir = basePath()

app.set('view engine', 'ejs')
app.set('views', 'views')

app.use(bodyParser.urlencoded({
    extended: false
}))

app.use(express.static(publicPath()))

app.use('/admin', adminRoutes)
app.use(shopRoutes)


app.use(errorsController.error404)

sequelize.sync({ force: true }).then()

app.listen(3000)
