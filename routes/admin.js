const express = require('express')
const fs = require('fs')
const { basePath, viewsPath } = require('./../helpers/path')

const router = express.Router()

router.get('/add-product', (req, res, next) => {
    res.sendFile(viewsPath('admin', 'add-product.html'))
})

router.post('/add-product', (req, res, next) => {
    const productsFile = basePath('products.json')
    fs.readFile(productsFile, (err, data) => {
        const products = JSON.parse(data ?? '[]')
        products.push({
            title: req.body.title
        })
        fs.writeFileSync(productsFile, JSON.stringify(products))
    })
    res.redirect('/')
})



module.exports = router