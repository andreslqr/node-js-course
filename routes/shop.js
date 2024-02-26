const express = require('express')
const shopController = require('./../controllers/shop/shop')

const router = express.Router()

router.get('/', shopController.home)
router.get('/products', shopController.listProducts)
router.get('/products/:productId', shopController.showProduct)
router.get('/orders', shopController.listOrders)
router.get('/shopping-cart', shopController.shoppingCart)
router.post('/shopping-cart/add', shopController.addToShoppingCart)
router.post('/shopping-cart/delete', shopController.removeFromShoppingCart)
router.post('/shopping-cart/order', shopController.convertToOrder)

module.exports = router