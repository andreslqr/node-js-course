const fs = require('fs')
const { basePath } = require('./../helpers/path')

const Product = require('./../models/product')

module.exports.getAddProduct = (req, res, next) => {
    res.render('admin/add-product', {
        metaTitle: 'Add product',
        path: '/admin/add-product'
    })
}

module.exports.postAddProduct = (req, res, next) => {

    const product = new Product(req.body.title)
    
    product.save()

    res.redirect('/')
}

module.exports.getProducts = (req, res, next) => {
    Product.all((products) => {
        res.render('shop', {
            products,
            hasProducts: products.length > 0,
            metaTitle: "Shop",
            path: '/'
        })
    });

}