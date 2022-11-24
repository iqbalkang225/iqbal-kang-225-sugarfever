const { check } = require('express-validator')
const User = require('../models/user-model')

const isEmailValid = check('email', 'Please enter a valid email')
                      .isEmail()

const isNameFilled = check('name', 'Please enter a name')
                      .isLength({ min: 1 })

const isPasswordValid = check('password', 'Password has to be atleast 6 characters and AlphaNumeric')
                          .isLength({ min: 6 })
                          .isAlphanumeric()

const arePasswordsEqual = check('confirmPassword')
                                .custom((value, { req } ) => {
                                  if(value !== req.body.password) {
                                    throw new Error('Passwords do not match')
                                  }
                                  return true
                                })
module.exports = {
  validateSignUp: [ isNameFilled, isEmailValid, isPasswordValid, arePasswordsEqual],
  validateSignIn: [isEmailValid]
}
