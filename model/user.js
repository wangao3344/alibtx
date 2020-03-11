const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Joi = require('joi');
const userSchema = new mongoose.Schema({
    icon: {
        type: String,

    },
    username: {
        type: String,
        required: [true, '用户名不能为空'],
        minlength: 2,
        maxlength: 16,
    },
    email: {
        type: String,
        required: [true, '邮箱不能为空'],
        minlength: 6,
        maxlength: 20,
    },
    password: {
        type: String,
        required: [true, '密码必填项'],
        minlength: 6,
    },
    // 是否激活
    isActive: {
        type: Number,

    },
    roles: {
        type: String,
        // 0 :admin 1:normal

    }
});
const User = mongoose.model('User', userSchema);
// 创建用户
const createUser = async(user) => {
        // 默认推荐10位
        let salt = await bcrypt.genSalt(10);
        // 进行加密
        user.password = await bcrypt.hash(user.password, salt);
        try {
            await User.create(user);
        } catch (error) {
            console.log(error);

        }
        console.log('执行成功');

    }
    //验证用户的方法
const verifyUser = (user) => {
        var schema = {
            // 允许为空
            icon: Joi.string().allow(''),
            email: Joi.string().min(6).max(26).required().regex(/^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/).error(new Error('邮箱不正确')),
            username: Joi.string().min(2).max(16).regex(/^[A-Za-z]{1}[A-Za-z0-9_-]{3,15}$/).error(new Error('昵称不合法')),
            // 0:代表未激活 1：激活
            isActive: Joi.number().valid(0, 1).required().error(new Error('激活选项不合法')),
            roles: Joi.string().valid('normal', 'admin').required().error(new Error('角色不合法')),
            password: Joi.string().min(6).required().regex(/^(\w){6,20}$/).error(new Error('密码太简单')),

        };
        // 验证通过返回对象本身
        return Joi.validate(user, schema);

    }
    // verifyUser({
    //     icon: '/uploads/icon.png',
    //     username: 'wangao',
    //     email: "wangao3344@163.com",
    //     password: 'wa5069369',
    //     roles: 'admin',
    //     isActive: 1,
    // }).then(data => {
    //     console.log(data);
    // }).catch(err => console.log(err));


// createUser({
//     icon: '/uploads/icon.png',
//     username: 'wangao',
//     email: "wangao3344@163.com",
//     password: 'wa5069369',
//     roles: 'admin'
// });
module.exports = {
    User,
    createUser,
    verifyUser
}