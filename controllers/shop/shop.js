const Product = require('./../../models/product')
const ShoppingCartItem = require('./../../models/shoppingCartItem')
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
    return res.render('shop/orders', {
        metaTitle: 'Orders'
    })
}

module.exports.shoppingCart = (req, res, next) => {
    req.user.getShoppingCart()
            .then(shoppingCart => {
                return shoppingCart.getProducts()
            })
            .then(products => {
                return res.render('shop/shopping-cart', {
                    metaTitle: 'Shopping Cart',
                    products
                })
            })
}

module.exports.addToShoppingCart = async (req, res, next) => {

    const shoppingCart = await req.user.getShoppingCart()
    const product = await Product.findByPk(req.body.productId)

    if(await shoppingCart.hasProduct(product)) {
        await ShoppingCartItem.increment({
            quantity: 1
        }, {
            where: {
                ShoppingCartId: shoppingCart.id,
                ProductId: product.id
            }
        })
    } else {
        await shoppingCart.addProduct(product, {
            through: {
                quantity: 1
            }
        })
    }
    
    return res.redirect('/shopping-cart')
}

module.exports.removeFromShoppingCart = async (req, res, next) => {
    await req.user.getShoppingCart()
            .then(shoppingCart => {
                return Product.findByPk(req.body.productId)
                        .then(product => {
                            return shoppingCart.removeProduct(product)
                        })
            })
    return res.redirect('/shopping-cart')
}

module.exports.convertToOrder = async (req, res, next) => {


}

module.exports.checkout = (req, res, next) => {
    return res.render('shop/checkout')
}
