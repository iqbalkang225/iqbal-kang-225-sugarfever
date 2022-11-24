const express = require('express')
const { validateSignUp, validateSignIn} = require('../middlewares/isValid')
const { getSignUp, postSignUp, getSignIn, postSignIn, postSignOut } = require('../controllers/auth-controller')

const router = express.Router()

router.get('/signup', getSignUp)
router.post('/signup', validateSignUp, postSignUp)

router.get('/signin', getSignIn)
router.post('/signin', validateSignIn, postSignIn)
router.post('/signout', postSignOut)

module.exports = router