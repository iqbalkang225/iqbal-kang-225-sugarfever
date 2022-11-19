const { Product } = require("../models/product-model")

const getAddProduct = (req, res) => {
  res.render('admin/add-product', {
    path: '/admin/add-product',
    pageTitle: 'Add Product',
    buttonCaption: "Add Product",
    action: "add-product",
    isEditing: false
  })
}

const postAddProduct = (req, res) => {
  const { name, image, price, description } = req.body

  const product = new Product(name, image, +price, description)
  product.save()

  res.redirect('/admin/add-product')
}

const getEditProduct = async (req, res) => {
  const isEditing = req.query.editing
  const productId = req.params.productId
  const product = await Product.fetchProductDetails(productId)

  res.render('admin/add-product', {
    path: '/admin/add-product',
    pageTitle: 'Edit Product',
    buttonCaption: 'Update Product', 
    action: "edit-product",
    isEditing: isEditing,
    productId,
    product
  })
}

const postEditProduct = async (req,res) => {
  const { name, image, price, description, productId } = req.body

  const products = await Product.fetchAll()

  const productIndex = products.findIndex(product => product.id === +productId)

  const product = new Product(name, image, +price, description)
  product.save(true, productIndex)
  
  res.redirect('/admin/products')

}

const getProducts = async (req, res) => {
  res.render('admin/products', {
    products: await Product.fetchAll(),
    path: '/admin/products',
    pageTitle: 'Admin Products'
  })
}

module.exports = {
  getAddProduct,
  postAddProduct,
  getEditProduct,
  postEditProduct,
  getProducts
}