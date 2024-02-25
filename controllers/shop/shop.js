const Product = require('./../../models/product')
const ShoppingCart = require('./../../models/shoppingCart')
const errorsController = require('./../../controllers/errors')

module.exports.home = (req, res, next) => {
    return res.render('shop', {
        metaTitle: 'Home'
    })
}

module.exports.listProducts = async (req, res, next) => {
    const products = await Product.findAll()

    return res.render('shop/products', {
        metaTitle: 'Products',
        products
    })
 
}

module.exports.showProduct = async (req, res, next) => {
    const product = await Product.findByPk(req.params.productId)
    
    if(! product)
        return errorsController.error404(req, res, next)

    return res.render('shop/products/show', {
        metaTitle: 'Products | ' + product.title,
        product
    })
    
}

module.exports.listOrders = (req, res, next) => {
    return res.render('shop/orders')
}

module.exports.shoppingCart = (req, res, next) => {
    return res.render('shop/shopping-cart', {
        metaTitle: 'Shopping Cart'
    })
}

module.exports.addToShoppingCart = (req, res, next) => {
    return Product.findByPk(req.body.productId, product => {
        ShoppingCart.addProduct(product.id, product.price)
        
        return res.redirect('/shopping-cart')
    })

}

module.exports.checkout = (req, res, next) => {
    return res.render('shop/checkout')
}
