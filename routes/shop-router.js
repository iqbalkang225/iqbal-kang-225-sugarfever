const express = require('express')
const { getHomePage, getProducts, getCart, getOrders, getProductDetails, postCart } = require('../controllers/shop-controller')

const router = express.Router()

// Shop Routes
router.get('/', getHomePage)

router.get('/products', getProducts)

router.get('/products/:productId', getProductDetails)

router.get('/cart', getCart)

router.post('/cart', postCart)

router.get('/orders', getOrders)

module.exports = router