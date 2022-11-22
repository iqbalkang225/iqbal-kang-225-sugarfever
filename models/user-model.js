const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: {type: String, required:true},
  password: {type: String, required:true},
  confirmPassword: {type: String, required:true},
  cart: {
    products: [{
      productId: { type: mongoose.SchemaTypes.ObjectId, ref: 'Product', required: true },
      quantity: { type: Number, required: true}
    }]
  }
})

userSchema.methods.addToCart = async function(id) {
  const productIndex = this.cart.products
                        .findIndex(product => product.productId.toString() === id.toString())
  
  if(productIndex === -1) {
    this.cart.products.push({productId: id, quantity: 1})
    await this.save()
  } else {
    let cartItem = this.cart.products[productIndex]
    cartItem = {...cartItem, quantity: cartItem.quantity++}
    await this.save( )
  }

}

module.exports = mongoose.model('User', userSchema)