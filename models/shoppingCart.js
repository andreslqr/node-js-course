const fs = require('fs')
const { storagePath } = require('./../helpers/path')
const Product = require('./product')


const file = 'shopping-carts.json'
const shoppingCartsPath = storagePath(file)

const ShoppingCart = class {
    
    static addProduct(productId, productPrice) {
        fs.readFile(shoppingCartsPath, (err, data) => {
            let cart = {
                products: [],
                totalPrice: 0
            }

            if(! err) {
                cart = JSON.parse(data)
            }

            const productIndex = cart.products.findIndex(product => product.id == productId)
            const existingCartProduct = cart.products[productIndex]

            let updatedProduct;

            if(existingCartProduct) {
                updatedProduct = {
                    ...existingCartProduct
                }
                updatedProduct.quantity += 1
                cart.products = [...cart.products]
                cart.products[productIndex] = updatedProduct
            }
            else {
                updatedProduct = {
                    id: productId,
                    quantity: 1,

                }
                cart.products = [...cart.products, updatedProduct]
            }

            cart.totalPrice = cart.totalPrice + + productPrice 

            fs.writeFileSync(shoppingCartsPath, JSON.stringify(cart))
        })
    }
}

module.exports = ShoppingCart