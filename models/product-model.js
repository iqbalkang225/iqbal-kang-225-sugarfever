const fs = require('fs')
const path = require('path')

const loadAllProducts = () => {
  const filePath = path.join(__dirname, '..', 'data', 'products.json')

  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (error, fileContent) => {
      if(error) resolve([])
      
      resolve(JSON.parse(fileContent))
    })
  })

}

class Product {
  constructor(name, image, price, description) {
    this.name = name
    this.image = image
    this.price = price
    this.description = description
    this.id = Math.random()
  }

  save(isEditing, index) {

    const filePath = path.join(__dirname, '..', 'data', 'products.json')
    // Read the file => no file(error) ? create [] : [].push(product) => write to the file 
    fs.readFile(filePath, (error, fileContent) => {
      let products = []

      if(!error) {
        products = JSON.parse(fileContent)
        if(isEditing) {
          products[index] = this
          fs.writeFile(filePath, JSON.stringify(products), (error) => {})
          return
        }
        products.push(this)
      }
      fs.writeFile(filePath, JSON.stringify(products), (error) => {})
    })
  }

  static async fetchAll() {
    return await loadAllProducts()
  }

  static async fetchProductDetails(id) {
    const products = await loadAllProducts()
    return products.find(product => product.id === +id)
  }

}

module.exports = { Product }