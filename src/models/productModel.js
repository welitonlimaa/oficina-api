const mongoose = require('../database');

const Products = new mongoose.Schema({
  urlImg: { type: String },
  title: { type: String },
  description: { type: String },
  carPart: { type: String },
  model: { type: String },
  ano: { type: String },
  carName: { type: String },
  price: { type: String },
  website: { type: String },
  urlProduct: { type: String },
});

const productModel = mongoose.model('Products', Products);

module.exports = productModel;