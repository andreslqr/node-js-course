const express = require('express')
const bodyParser = require('body-parser')

const { publicPath, viewsPath, basePath } = require('./helpers/path')

const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')


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

app.use((req, res, next) => {
    return res.status(404)
            .render('errors/404', {
                path: null,
                metaTitle: 'Page not found'
            })
})

app.listen(3000)