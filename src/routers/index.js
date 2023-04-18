const express = require('express');

const { insertProducts, getProducts } = require('../controllers/productController');

const router = express.Router();

router.get('/:carPart/:carName/:model/:ano', getProducts);

router.post('/', insertProducts);

module.exports = router;