const fs = require('fs')
const { storagePath } = require('./../helpers/path')


const file = 'products.json'
const productsPath = storagePath(file)
const getData = cb => {
    fs.readFile(productsPath, (err, data) => {
        if(err) {
            return cb([])
        }

        return cb(JSON.parse(data))
    })
}

module.exports = class Product {
    constructor(title) {
        this.title = title
    }
    save() {
        fs.readFile(productsPath, (err, data) => {
            getData((products) => {

                products.push(this)
                fs.writeFileSync(productsPath, JSON.stringify(products))

            })
        })

    }
    static all(cb) {
        return getData(cb)

    }
}