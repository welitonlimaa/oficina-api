const Product = require('../models/productModel');
const mlScraping = require('../scraping/mercadoLivre');

const saveSearchProducts = async (products) => await Product.insertMany(products);

const getProducts = async ({ carPart, carName, model, ano }) => {
  let products = await Product.find({
    $and: [
      { carPart: { $regex: carPart, $options: 'i' } },
      { carName: { $regex: carName, $options: 'i' } },
      { model: { $regex: model, $options: 'i' } },
      { ano: { $regex: ano, $options: 'i' } },
    ]
  });

  if (products.length !== 0) return products;

  const searchData = { carPart, carName, model, ano };
  products = await mlScraping(searchData);

  await saveSearchProducts(products);

  return products;
};

module.exports = {
  getProducts,
}