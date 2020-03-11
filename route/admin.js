var express = require('express');
var admin = express.Router();
admin.post('/login', require('./admin/login'));
admin.get('/isLogin', require('./admin/isLogin'));
admin.post('/loginOut', require('./admin/loginOut'));
admin.post('/user', require('./admin/addUser'));
admin.post('/uploads', require('./admin/uploads'));
admin.get('/showUsers', require('./admin/showUsers'));
module.exports = admin;