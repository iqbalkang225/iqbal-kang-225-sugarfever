const User = require("../models/user-model")
const bcrypt = require('bcryptjs')

const getSignUp = (req, res) => {
  res.render('auth/signup', {
    path: '/signup',
    pageTitle: 'Sign Up',
    error: req.flash('error')
  })
}

const postSignUp = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body

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
    passwordError: req.flash('passwordError')
  })
}

const postSignIn = async (req, res) => {
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