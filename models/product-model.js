const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: {type: Number, required:true},
  image: {type: String, required:true},
  description: {type: String, required:true},
  userId: {type: mongoose.SchemaTypes.ObjectId, required: true, ref: 'User'}
})

module.exports = mongoose.model('Product', productSchema)