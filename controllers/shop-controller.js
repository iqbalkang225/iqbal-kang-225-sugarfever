const { Cart } = require("../models/cart")
const { Product } = require("../models/product-model")

const getHomePage = (req, res) => {
  res.render('shop/index', {
    path: '/',
    pageTitle: 'Home'
  })
}

const getProducts = async (req, res) => {
  const products = await Product.fetchAll()
  res.render('shop/products', {
    products,
    path: '/products',
    pageTitle: 'Products'
  })
}

const getProductDetails = async (req, res) => {
  const productId = +req.params.productId
  const product = await Product.fetchProductDetails(productId)
  res.render('shop/product-details', {
    products: [product],
    path: '/products',
    pageTitle: product.name
  })
}

const getCart = async (req, res) => {
  const cart = await Cart.fetchAllProducts()
  const allProducts = await Product.fetchAll()
  const cartProducts = []

  for(var product of allProducts) {
    const cartProductData = cart.products.find(cartItem => +cartItem.id === product.id)
    if(cartProductData) {
      cartProducts.push({products: product, quantity: cartProductData.quantity})
    }
  }

  console.log(cartProducts)

  res.render('shop/cart', {
    path: '/cart',
    pageTitle: 'Cart',
    // products: await Cart.fetchAllProducts()
  })
}

const postCart = (req, res) => {
  const productId = req.body.productId
  const productPrice = req.body.productPrice
  Cart.addToCart(productId, productPrice)
  res.redirect('/cart')
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