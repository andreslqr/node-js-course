const express = require('express')
const shopController = require('./../controllers/shop/shop')
const authController = require('./../controllers/shop/auth')

const router = express.Router()

router.get('/register', authController.registerForm)
router.post('/register', authController.register)

router.get('/login', authController.loginForm)
router.post('/login', authController.login)
router.post('/logout', authController.logout)

router.get('/', shopController.home)
router.get('/products', shopController.listProducts)
router.get('/products/:productId', shopController.showProduct)
router.get('/orders', shopController.listOrders)
router.get('/shopping-cart', shopController.shoppingCart)
router.post('/shopping-cart/add', shopController.addToShoppingCart)
router.post('/shopping-cart/delete', shopController.removeFromShoppingCart)
router.post('/shopping-cart/order', shopController.convertToOrder)

module.exports = router