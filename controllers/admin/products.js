const Product = require('./../../models/product')
const errorsController = require('./../errors')

module.exports.index = async (req, res, next) => {
    const products = await Product.findAll()
    
    return res.render('admin/products', {
        records: products,
        metaTitle: "Products"
    })
}

module.exports.create = (req, res, next) => {
    return res.render('admin/products/form', {
        metaTitle: "Products | Create",
        product: null
    })
}

module.exports.store = async (req, res, next) => {

    await Product.create(req.body)

    return res.redirect('/admin/products')
}

module.exports.edit = async (req, res, next) => {

    const product = await Product.findByPk(req.params.productId)
    
    if(product) {
        return res.render('admin/products/form', {
            metaTitle: "Products | Edit",
            product
        })
    }
    
    return errorsController.error404(req, res, next)

}

module.exports.update = async (req, res, next) => {

    let product = await Product.findByPk(req.params.productId)

    if(product) {
        product.set(req.body).save()

        return res.redirect('/admin/products')
    }

    return errorsController.error404(req, res, next)
    
}

module.exports.destroy = async (req, res, next) => {

    const product = await Product.findByPk(req.params.productId)

    if(product) {
        product.destroy()

        return res.redirect('/admin/products')
    }

    return errorsController.error404(req, res, next)
}