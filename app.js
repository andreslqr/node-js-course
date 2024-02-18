const express = require('express')
const bodyParser = require('body-parser')
const { engine } = require('express-handlebars')

const { publicPath, viewsPath, basePath } = require('./helpers/path')

const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')


const app = express()
app.locals.basedir = basePath()

app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', 'views')

app.use(bodyParser.urlencoded({
    extended: false
}))

app.use(express.static(publicPath()))

app.use('/admin', adminRoutes)
app.use(shopRoutes)

app.use((req, res, next) => {
    return res.status(404)
            .render('errors/404', {
                metaTitle: 'Page not found'
            })
})

app.listen(3000)