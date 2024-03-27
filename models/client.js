const { Schema, model } = require('mongoose')


const schema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    shoppingCart: {
        items: [
            {
                productId: {
                    type: Schema.Types.ObjectId,
                    required: true,
                    ref: 'Product'
                },
                quantity: {
                    type: Number,
                    required: true
                }
            }
        ]
    }
})


schema.methods.addToShoppingCart = function (product) {
    const shoppingCartProductIndex = this.shoppingCart.items.findIndex(cp => {
        return cp.productId.toString() === product._id.toString();
    });
    let newQuantity = 1;
    const updatedCartItems = [...this.shoppingCart.items];

    if (shoppingCartProductIndex >= 0) {
        newQuantity = this.shoppingCart.items[shoppingCartProductIndex].quantity + 1;
        updatedCartItems[shoppingCartProductIndex].quantity = newQuantity;
    } else {
        updatedCartItems.push({
            productId: product._id,
            quantity: newQuantity
        });
    }
    const updatedCart = {
        items: updatedCartItems
    };
    this.shoppingCart = updatedCart;
    return this.save();
}

schema.methods.removeFromShoppingCart = function (productId) {
    const updatedCartItems = this.shoppingCart.items.filter(item => {
        return item.productId.toString() !== productId.toString();
    });

    this.shoppingCart.items = updatedCartItems;
    return this.save();
}

module.exports = model('User', schema)