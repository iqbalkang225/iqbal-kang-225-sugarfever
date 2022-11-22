const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const session = require('express-session')
const MongoDBSession = require('connect-mongodb-session')(session)
const flashError = require('connect-flash')

const shopRoutes = require('./routes/shop-router')
const adminRoutes = require('./routes/admin-router')
const authRoutes = require('./routes/auth-router')
const errorRoutes = require('./routes/404-router')
const { isAuth } = require('./middlewares/isAuth')
const User = require('./models/user-model')

const PORT = 8000
const DB_URL = 'mongodb+srv://iqbal1818:AQ2CAWMfQSSYYVz5@sugarfever.lrfg7lv.mongodb.net/sugarfever?retryWrites=true&w=majority'

const app = express()

// Setting up the default Templating Engine
app.set('view engine', 'ejs')
app.set('views', 'views')

// Creating Sessions
const store = new MongoDBSession({
  uri: DB_URL,
  collection: 'sessions'
})

app.use(session({
  secret: 'a very long string',
  resave: false,
  saveUninitialized: false,
  store: store
}))

app.use(async (req, res, next) => {
  if(!req.session.userId) return next()

  const user = await User.findById(req.session.userId) 
  req.user = user
  next()
})

app.use(flashError())

app.use((req, res, next) => {
  res.locals.isSignedIn = req.session.isSignedIn
  next()
})

// Parsing request and serving Static files middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static('public'))

// Routes Middlewares
app.use('/admin', isAuth, adminRoutes)
app.use(shopRoutes)
app.use(authRoutes)
app.use('/*', errorRoutes)

//Initialize the Database and starting the server
mongoose
  .connect(DB_URL)
  .then(() => app.listen(PORT, () => console.log(`Listening on ${PORT}...`)) )
