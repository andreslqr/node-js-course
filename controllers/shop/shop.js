module.exports.home = (req, res, next) => {
    return res.render('shop')
}

module.exports.listProducts = (req, res, next) => {
    return res.render('shop/products')
}

module.exports.showProduct = (req, res, next) => {
    return res.render('shop/products/show')
}

module.exports.listOrders = (req, res, next) => {
    return res.render('shop/orders')
}

module.exports.shoppingCart = (req, res, next) => {
    return res.render('shop/shopping-cart')
}

module.exports.checkot = (req, res, next) => {
    return res.render('shop/checkout')
}
