const express = require('express')
const bodyParser = require('body-parser')

const { publicPath, viewsPath, basePath } = require('./helpers/path')
const errorsController = require('./controllers/errors')

const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')

const sequelize = require('./database')
const Product = require('./models/product')
const User = require('./models/user')
const ShoppingCart = require('./models/shoppingCart')
const ShoppingCartItem = require('./models/shoppingCartItem')
const Order = require('./models/order')
const OrderItem = require('./models/orderItem')

const app = express()

app.locals.basedir = basePath()

app.set('view engine', 'ejs')
app.set('views', 'views')

app.use(bodyParser.urlencoded({
    extended: false
}))

app.use(express.static(publicPath()))

app.use(async (req, res, next) => {
    const user = await User.findByPk(1)
    req.user = user
    next()
})

app.use('/admin', adminRoutes)
app.use(shopRoutes)


app.use(errorsController.error404)


Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' })
User.hasMany(Product)
User.hasOne(ShoppingCart)

ShoppingCart.belongsTo(User)
ShoppingCart.belongsToMany(Product, { through: ShoppingCartItem })
Product.belongsToMany(ShoppingCart, { through: ShoppingCartItem })

Order.belongsTo(User)
Order.belongsToMany(Product, { through: OrderItem })
Product.belongsToMany(Product, { through: OrderItem })


sequelize.sync({ force: false })
    .then(result => {
        return User.findByPk(1)
    })
    .then(user => {
        if(! user) {
            return User.create({
                name: "Dummy",
                email: "test@mail.com"
            })
        }

        return user
    })
    .then(user => {
        user.createShoppingCart()
        console.log('Dummy user with id: ' + user.id)
        app.listen(3000)
    })


