const express = require('express')
const fs = require('fs')
const { basePath, viewsPath } = require('./../helpers/path')

const router = express.Router()

router.get('/', (req, res, next) => {
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
})

module.exports = router