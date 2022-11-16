const products = []
const fs = require('fs')
const path = require('path')

class Product {
  constructor(name, image, price, description) {
    this.name = name
    this.image = image
    this.price = price
    this.description = description
  }

  save() {
    products.push(this)
  }

  fetchAll() {
    return products
  }
}

module.exports = { Product, products}