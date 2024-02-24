const express = require('express')
const shopController = require('./../controllers/shop/shop')

const router = express.Router()

router.get('/', shopController.home)
router.get('/products', shopController.listProducts)
router.get('/products/:productId', shopController.listProducts)
router.get('/orders', shopController.listOrders)
router.get('/shopping-cart', shopController.shoppingCart)

module.exports = router