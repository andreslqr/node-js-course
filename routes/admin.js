const express = require('express')

const router = express.Router()

router.get('/', (req, res, next) => {
    res.send('<h1>admin page</h1>')
})

router.get('/add-product', (req, res, next) => {
    res.send(`
        <form action="/admin/add-product" method="POST">
            <input type="text" name="title" required>
            <button type="submit">
                Send
            </button>
        </form>
    `)
})

router.post('/add-product', (req, res, next) => {
    console.log(req.body)
    res.redirect('/admin')
})



module.exports = router