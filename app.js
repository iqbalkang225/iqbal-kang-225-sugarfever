const express = require('express')
const bodyParser = require('body-parser')

const shopRoutes = require('./routes/shop-router')
const adminRoutes = require('./routes/admin-router')

const PORT = 8000

const app = express()

// Setting up the default Templating Engine
app.set('view engine', 'ejs')
app.set('views', 'views')

// Parsing request and serving Static files middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static('public'))

// Routes Middlewares
app.use(shopRoutes)
app.use('/admin', adminRoutes)

// Initializing the Server
app.listen(PORT, () => console.log(`Listening on ${PORT}...`))