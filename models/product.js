const fs = require('fs')
const { storagePath } = require('./../helpers/path')


const file = 'products.json'
const productsPath = storagePath(file)

const Product = class {
    constructor(attributes) {
        for(const attribute in attributes) {
            this[attribute] = attributes[attribute]
        }
    }
    static create(attributes) {
        return new Product(attributes).save()
    }
    save() {
        fs.readFile(productsPath, (err, data) => {
            getData((products) => {

                products.push(this)
                fs.writeFileSync(productsPath, JSON.stringify(products))

            })
        })

    }
    static findAll(cb) {
        return getData(cb)
    }
}

const getData = cb => {
    fs.readFile(productsPath, (err, data) => {
        if(err) {
            return cb([])
        }

        const products = JSON.parse(data).map((product) => new Product(product))
        return cb(products)
    })
}

module.exports = Product