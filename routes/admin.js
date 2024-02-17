const express = require('express')
const { viewsPath } = require('./../helpers/path')

const router = express.Router()

router.get('/', (req, res, next) => {
    res.sendFile(viewsPath('admin', 'index.html'))
})

router.get('/add-product', (req, res, next) => {
    res.sendFile(viewsPath('admin', 'add-product.html'))
})

router.post('/add-product', (req, res, next) => {
    console.log(req.body)
    res.redirect('/admin')
})



module.exports = router