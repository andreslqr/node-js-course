const fs = require('fs')
const { basePath } = require('./../helpers/path')

module.exports.getAddProduct = (req, res, next) => {
    res.render('admin/add-product', {
        metaTitle: 'Add product',
        path: '/admin/add-product'
    })
}

module.exports.postAddProduct = (req, res, next) => {
    const productsFile = basePath('products.json')
    fs.readFile(productsFile, (err, data) => {
        const products = JSON.parse(data ?? '[]')
        products.push({
            title: req.body.title,
        })
        fs.writeFileSync(productsFile, JSON.stringify(products))
    })
    res.redirect('/')
}

module.exports.getProducts = (req, res, next) => {
    let products = [];
    try {
        products = JSON.parse(fs.readFileSync(basePath('products.json')))
    } catch(err) {
    }

    res.render('shop', {
        products,
        hasProducts: products.length > 0,
        metaTitle: "Shop",
        path: '/'
    })
}