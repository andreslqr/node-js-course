const express = require('express')
const productsController = require('./../controllers/admin/products')

const router = express.Router()

router.get('/products', productsController.index)
router.get('/products/create', productsController.create)
router.post('/products/create', productsController.store)
router.get('/products/:productId/edit', productsController.edit)
router.post('/products/:productId/edit', productsController.update)


module.exports = router