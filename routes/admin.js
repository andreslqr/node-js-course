const express = require('express')
const productsController = require('./../controllers/admin/products')
const authController = require('./../controllers/admin/auth')
const isAuthenticated = require('../middlewares/admin/isAuthenticated')

const router = express.Router()

router.get('/', (req, res, next) => res.redirect('/admin/products'))
router.get('/register', authController.registerForm)
router.post('/register', authController.register)

router.get('/login', authController.loginForm)
router.post('/login', authController.login)
router.post('/logout', authController.logout)

router.get('/products', isAuthenticated, productsController.index)
router.get('/products/create', isAuthenticated, productsController.create)
router.post('/products/create', isAuthenticated, productsController.store)
router.get('/products/:productId/edit', isAuthenticated, productsController.edit)
router.post('/products/:productId/delete', isAuthenticated, productsController.destroy)
router.post('/products/:productId/edit', isAuthenticated, productsController.update)


module.exports = router