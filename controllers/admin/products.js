const Product = require('./../../models/product')
const errorsController = require('./../errors')

module.exports.index = (req, res, next) => {
    return Product.findAll((records) => {
        return res.render('admin/products', {
            records,
            metaTitle: "Products"
        })
    })
}

module.exports.create = (req, res, next) => {
    return res.render('admin/products/form', {
        metaTitle: "Products | Create",
        product: null
    })
}

module.exports.store = (req, res, next) => {

    Product.create(req.body)

    return res.redirect('/admin/products')
}

module.exports.edit = (req, res, next) => {

    return Product.findByPk(req.params.productId, product => {
        
        if(product) {
            return res.render('admin/products/form', {
                metaTitle: "Products | Edit",
                product
            })
        }
        
        return errorsController.error404(req, res, next)

    })

}

module.exports.update = (req, res, next) => {
    return Product.findByPk(req.params.productId, product => {
        if(product) {
            product.fill(req.body).save()

            return res.redirect('/admin/products')
        }

        return errorsController.error404(req, res, next)
    })
}

module.exports.destroy = (req, res, next) => {

    return Product.findByPk(req.params.productId, product => {
        if(product) {
            product.delete()

            return res.redirect('/admin/products')
        }

        return errorsController.error404(req, res, next)
    })
}