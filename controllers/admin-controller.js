const { Product } = require("../models/product-model")

const getAddProduct = (req, res) => {
  res.render('admin/add-product', {
    path: 'add-product',
    pageTitle: 'Add Product'
  })
}

const postAddProduct = (req, res) => {
  const { name, image, price, description } = req.body

  const product = new Product(name, image, price, description)
  product.save()

  res.redirect('/admin/add-product')
}

module.exports = {
  getAddProduct,
  postAddProduct
}