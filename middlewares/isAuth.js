const isAuth = (req, res, next) => {
  if(!req.session.isSignedIn) res.redirect('/')
  
  next()
}

module.exports = { isAuth }