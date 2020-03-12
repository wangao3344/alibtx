const express = require('express');
const article = express.Router();
article.post('/category', require('./article/addCategory'));
article.get('/listCategory', require('./article/listCategory'));
module.exports = article;