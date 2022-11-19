const express = require('express')
const { getAddProduct, postAddProduct, getProducts, getEditProduct, postEditProduct } = require('../controllers/admin-controller')

const router = express.Router()

router.get('/add-product', getAddProduct)

router.post('/add-product', postAddProduct)

router.get('/edit-products/:productId', getEditProduct)

router.post('/edit-product', postEditProduct)

router.get('/products', getProducts)

module.exports = router