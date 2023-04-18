const Product = require('../models/productModel');

const services = require('../services/productService');

const insertProducts = async (req, res) => {
  try {
    const { body } = req;
    const result = await Product.create(body);
    return res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: 'erro interno', error });
  }
};

const getProducts = async (req, res) => {
  try {
    const { carPart, carName, model, ano } = req.params;

    const result = await services.getProducts({ carPart, carName, model, ano });

    return res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: 'erro interno', error });
  }
};

module.exports = {
  insertProducts,
  getProducts
}