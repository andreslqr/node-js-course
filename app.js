const express = require('express')
const bodyParser = require('body-parser')
const User = require('./models/user')

const { publicPath, viewsPath, basePath } = require('./helpers/path')
const errorsController = require('./controllers/errors')
const mongoose = require('mongoose')

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

app.use(async (req, res, next) => {
    let data = {
        name: 'Jhon Doe',
        email: 'a@mail.com'
    }

    req.user = await User.findOneAndUpdate(
        data, // Condición de búsqueda
        {}, // Valores a actualizar o establecer si el usuario no existe
        { new: true, upsert: true } // Opciones: Devolver el nuevo documento y crearlo si no existe
    );

    next()
})


app.use('/admin', adminRoutes)
app.use(shopRoutes)


app.use(errorsController.error404)

mongoose.connect(process.env.MONGODB_URI)
    .then(resulut => app.listen(process.env.APP_PORT))





