const express = require('express')
const { viewsPath } = require('./../helpers/path')

const router = express.Router()

router.get('/', (req, res, next) => {
    res.sendFile(viewsPath('shop', 'index.html'))
})

module.exports = router