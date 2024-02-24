const Product = require('./../../models/product')

module.exports.index = (req, res, next) => {
    return Product.findAll((records) => {
        return res.render('admin/products', {
            records,
            metaTitle: "Products"
        })
    })
}

module.exports.create = (req, res, next) => {
    return res.render('admin/products/create', {
        metaTitle: "Products | Create"
    })
}

module.exports.store = (req, res, next) => {

    Product.create(req.body)

    return res.redirect('/admin/products')
}

module.exports.edit = (req, res, next) => {
    return res.render('admin/products/create', {
        metaTitle: "Products | Edit"
    })
}