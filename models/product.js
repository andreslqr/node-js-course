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
    fill(attributes) {
        for(const attribute in attributes) {
            this[attribute] = attributes[attribute]
        }

        return this
    }
    save() {
        getData(products => {

            if(! this.id) {
                this.id = Math.random().toString()
                products.push(this)
            }
            else {
                const productIndex = products.findIndex(record => record.id == this.id)
                products[productIndex] = this
            }

            fs.writeFileSync(productsPath, JSON.stringify(products))

        })
        

    }
    static findAll(cb) {
        return getData(cb)
    }
    static findByPk(pk, cb) {
        return getData(products => {
            const product = products.find(product => product.id == pk)

            cb(product)
        })
    }
    delete() {
        getData(products => {
            fs.writeFileSync(productsPath, JSON.stringify(products.filter(product => product.id !== this.id)))
        })
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