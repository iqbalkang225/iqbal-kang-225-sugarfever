const fs = require('fs')
const path = require('path')


class Cart {
  static addToCart(id, price) {
    const filePath = path.join(__dirname, '..', 'data', 'cart.json')
    
    fs.readFile(filePath, (error, fileContent) => {
      let cart = { products: [], totalPrice: 0 }

      if(!error) cart = JSON.parse(fileContent)

      const productIndex = cart.products.findIndex(product => product.id === id)
      
      if(productIndex === -1) {
        cart.products.push({id: id, quantity: 1})
        cart.totalPrice = cart.totalPrice + +price
      }
      else {
        const cartItem = cart.products[productIndex]
        cart.products[productIndex] = {...cartItem, quantity: cartItem.quantity + 1}
        cart.totalPrice = cart.totalPrice + +price
      }

      fs.writeFile(filePath, JSON.stringify(cart), error => {})

    })
  }

  static fetchAllProducts() {
    const filePath = path.join(__dirname, '..', 'data', 'cart.json')

    return new Promise((resolve, reject) => {
      fs.readFile(filePath, (error, fileContent) => {
        
        if(error) resolve([])
        else {
          const cartProducts = fileContent
          resolve(JSON.parse(cartProducts))
        }
      })
    })

  }
}

module.exports = { Cart }