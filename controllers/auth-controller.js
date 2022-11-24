const User = require("../models/user-model")
const bcrypt = require('bcryptjs')
const { validationResult } = require('express-validator')

const getSignUp = (req, res) => {
  res.render('auth/signup', {
    path: '/signup',
    pageTitle: 'Sign Up',
    errors: req.flash('error'),
    oldInputs: {name: '', email: '', password: '', confirmPassword: ''}
  })
}

const postSignUp = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body

  const errors = validationResult(req)
  let nameError, emailError, passwordError, confirmPasswordError
  errors.array().forEach(error => {
    if(error.param === 'name') nameError = error.msg
    if(error.param === 'email') emailError = error.msg
    if(error.param === 'password') passwordError = error.msg
    if(error.param === 'confirmPassword') confirmPasswordError = error.msg
  })

  if(!errors.isEmpty()) {
    return res.render('auth/signup', {
      path: '/signup',
      pageTitle: 'Sign Up',
      errors: {
        name: nameError,
        email: emailError,
        password: passwordError,
        confirmPassword: confirmPasswordError,
      },
      oldInputs: {name, email, password, confirmPassword}
    })
  }

  const user = await User.findOne( {email: email} )
  if(user) {
    req.flash('error', 'User already exists, Try signin in')
    return res.redirect('/signup')
  }

  const hashedPassword = await bcrypt.hash(password, 12)
  
  const newUser = new User({ name, email, password: hashedPassword, confirmPassword, cart: {} })
  await newUser.save()
  res.redirect('/signin')
}

const getSignIn = (req, res) => {
  res.render('auth/signin', {
    path: '/signin',
    pageTitle: 'Sign In',
    error: req.flash('error'),
    passwordError: req.flash('passwordError'),
    oldInputs: { email: '', password: '' }
  })
}

const postSignIn = async (req, res) => {
  const { email, password } = req.body

  const errors = validationResult(req)
  
  if(!errors.isEmpty()) {
    return res.render('auth/signin', {
      path: '/signin',
      pageTitle: 'Sign In',
      error: errors.array()[0].msg,
      passwordError: req.flash('passwordError'),
      oldInputs: { email, password }
    })
  }

  const user = await User.findOne({ email: req.body.email })
  if(!user) {
    req.flash('error', "Email does not exist")
    return res.redirect('/signin')
  }

  const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password)
  if(!isPasswordCorrect) {
    req.flash('passwordError', 'Wrong Password')
    return res.redirect('/signin')
  }
  req.session.userId = user._id
  req.session.isSignedIn = true

  req.session.save((error) => {
    res.redirect('/')
  })
}

const postSignOut = (req, res) => {
  req.session.destroy(() => res.redirect('/'))
}

module.exports = {
  getSignUp,
  postSignUp,
  getSignIn,
  postSignIn,
  postSignOut
}