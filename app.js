const express = require('express');
const path = require('path');
const admin = require('./route/admin');
const bodyParser = require('body-parser');
const session = require('express-session');
const app = express();
require('./model/connect');
// require('./model/user');
// 静态资源管理目录
app.use(express.static(path.join(__dirname, 'public')));
// 配置 express-session
app.use(session({
    resave: false, //添加 resave 选项
    saveUninitialized: true, //添加 saveUninitialized 选项
    secret: 'alibtx',
}));
// 配置body-parser
// app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

// 一级路由
app.use('/admin', admin);
app.use('/article', require('./route/article'));
app.listen(80);
console.log('服务器开启成功');
//错误处理器
app.use((error, req, res, next) => {

})