const express = require('express');
require('dotenv').config()
const cors = require('cors');
const morgan = require('morgan');

const router = require('./routers');

const PORT = process.env.PORT || 3002;

const app = express();

app.use(cors({
  origin: '*'
}));

app.use(express.json());

app.use(morgan('tiny'));

app.use('/', router);


app.listen(PORT)