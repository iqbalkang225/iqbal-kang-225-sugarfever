const express = require('express')
const { getHomePage, getProducts } = require('../controllers/shop-controller')

const router = express.Router()

router.get('/', getHomePage)
router.get('/products', getProducts)

module.exports = router