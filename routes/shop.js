const express = require('express')
const fs = require('fs')
const productsController = require('./../controllers/products')

const router = express.Router()

router.get('/', productsController.getProducts)

module.exports = router