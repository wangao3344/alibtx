const express = require('express');
const article = express.Router();
article.post('/category', require('./article/addCategory'));
article.get('/category/:id', require('./article/findCategoryByid'));
article.get('/listCategory', require('./article/listCategory'));
article.put('/category/:id', require('./article/modifyCategoryById'));
article.delete('/category/:id', require('./article/deleteCategory'));
module.exports = article;