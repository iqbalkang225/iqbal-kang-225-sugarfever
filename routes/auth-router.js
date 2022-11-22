const express = require('express')
const { getSignUp, postSignUp, getSignIn, postSignIn, postSignOut } = require('../controllers/auth-controller')

const router = express.Router()

router.get('/signup', getSignUp)
router.post('/signup', postSignUp)

router.get('/signin', getSignIn)
router.post('/signin', postSignIn)
router.post('/signout', postSignOut)

module.exports = router