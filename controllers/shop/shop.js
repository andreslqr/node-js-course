const Product = require('./../../models/product')
const errorsController = require('./../../controllers/errors')

module.exports.home = (req, res, next) => {
    return res.render('shop', {
        metaTitle: 'Home'
    })
}

module.exports.listProducts = async (req, res, next) => {
    const products = await Product.find()

    return res.render('shop/products', {
        metaTitle: 'Products',
        products
    })
 
}

module.exports.showProduct = async (req, res, next) => {
    const product = await Product.findById(req.params.productId)
    
    if(! product)
        return errorsController.error404(req, res, next)

    return res.render('shop/products/show', {
        metaTitle: 'Products | ' + product.title,
        product
    })
    
}

module.exports.listOrders = async (req, res, next) => {

    const orders = await req.user.getOrders({
        include: [
            Product
        ],
        order: [
            ['id', 'DESC']
        ]
    })
    return res.render('shop/orders', {
        metaTitle: 'Orders',
        orders
    })
}

module.exports.shoppingCart = async (req, res, next) => {
    const user = await req.user
        .populate('shoppingCart.items.productId')
    
    return res.render('shop/shopping-cart', {
        metaTitle: 'Shopping Cart',
        products: user.shoppingCart.items
    })
}

module.exports.addToShoppingCart = async (req, res, next) => {

    const product = await Product.findById(req.body.productId)

    await req.user.addToShoppingCart(product)

    return res.redirect('/shopping-cart')
}

module.exports.removeFromShoppingCart = async (req, res, next) => {
    
    await req.user.removeFromShoppingCart(req.body.productId)
    return res.redirect('/shopping-cart')
}

module.exports.convertToOrder = async (req, res, next) => {

    const shoppingCart = await req.user.getShoppingCart()
    const products = await shoppingCart.getProducts()

    const order = await req.user.createOrder()

    await products.forEach(product => order.addProduct(product, {
        through: {
            quantity: product.ShoppingCartItem.quantity
        }
    }))

    await shoppingCart.setProducts([])

    return res.redirect('/orders')
}

module.exports.checkout = (req, res, next) => {
    return res.render('shop/checkout')
}
