const Product = require('../models/product-model')

const ITEMS_PER_PAGE = 3

const getAddProduct = (req, res) => {
  res.render('admin/add-product', {
    path: '/admin/add-product',
    pageTitle: 'Add Product',
    buttonCaption: "Add Product",
    action: "add-product",
    isEditing: false
  })
}

const postDeleteProduct = async (req, res) => {
  const productId = req.params.id
  await Product.findByIdAndRemove(productId)
  res.redirect('/admin/products')
  
}

const getProducts = async (req, res) => {
  const page = +req.query.page

  const totalProducts = await Product.find().countDocuments()
  const products = await Product.find().skip((page - 1) * ITEMS_PER_PAGE).limit(ITEMS_PER_PAGE)

  res.render('shop/products', {
    path: '/admin/products',
    pageTitle: 'Admin Products',
    totalPages: Math.ceil(totalProducts / ITEMS_PER_PAGE),
    currentPage: page,
    products,
    totalProducts,

  })
}

const postAddProduct = (req, res) => {
  const { name, price, description } = req.body

  const image = req.file.path

  console.log(image)

  const product = new Product({name, image, price, description, userId: req.user})
  product.save()

  res.redirect('/admin/add-product')
}

const getEditProduct = async (req, res) => {
  const isEditing = req.query.editing
  const productId = req.params.productId
  const product = await Product.findById(productId)

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

  const product = await Product.findById(productId)

  product.name = name
  product.image = image
  product.price = price
  product.description = description

  await product.save()
  res.redirect('/admin/products')

}

module.exports = {
  getAddProduct,
  postAddProduct,
  getEditProduct,
  postEditProduct,
  getProducts,
  postDeleteProduct
}