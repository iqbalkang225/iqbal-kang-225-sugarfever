// const { Cart } = require("../models/cart")
const User = require('../models/user-model')
const Product = require("../models/product-model")

const ITEMS_PER_PAGE = 3

const getHomePage = (req, res) => {
  res.render('shop/index', {
    path: '/',
    pageTitle: 'Home | Sugarfever'
  })
}

const getProducts = async (req, res) => {
  const page = +req.query.page

  const totalProducts = await Product.find().countDocuments()
  const products = await Product.find().skip((page - 1) * ITEMS_PER_PAGE).limit(ITEMS_PER_PAGE)

  res.render('shop/products', {
    path: '/products',
    pageTitle: 'Products',
    totalPages: Math.ceil(totalProducts / ITEMS_PER_PAGE),
    currentPage: page || 1,
    products,
    totalProducts,
  })
}

const getProductDetails = async (req, res) => {
  const productId = req.params.id
  const product = await Product.findById(productId)
  res.render('shop/product-details', {
    products: [product],
    path: '/products',
    pageTitle: product.name
  })
}

const getCart = async (req, res) => {

const user = await req.user.populate('cart.products.productId')
const products = user.cart.products

  res.render('shop/cart', {
    path: '/cart',
    pageTitle: 'Cart',
    products
  })
}

const postCart = async (req, res) => {
  const productId = req.body.productId
  const productPrice = req.body.productPrice

  const product = await Product.findById(productId)

  req.user.addToCart(product._id)
  return res.redirect('/products')
}

const getOrders = (req, res) => {
  res.render('shop/orders', {
    path: '/products',
    pageTitle: 'Orders'
  })
}

module.exports = {
  getHomePage,
  getProducts,
  getProductDetails,
  getCart,
  postCart,
  getOrders
}