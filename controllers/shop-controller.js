const { products } = require("../models/product-model")

const getHomePage = (req, res) => {
  res.render('shop/index', {
    path: 'index',
    pageTitle: 'Home'
  })
}

const getProducts = (req, res) => {
  res.render('shop/products', {
    products: products,
    path: 'products',
    pageTitle: 'Products'
  })
}

module.exports = {
  getHomePage,
  getProducts
}