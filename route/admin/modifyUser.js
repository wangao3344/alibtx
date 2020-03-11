const _ = require('lodash');
const Formidable = require('formidable');
const { User } = require('../../model/user');
const Joi = require('joi');
module.exports = (req, res) => {
    var formidable = new Formidable.IncomingForm();
    formidable.parse(req, async(err, fields, files) => {
        // 让json去除 email password 对应属性
        fields = _.pick(fields, ['icon', 'username', 'roles', 'isActive']);
        fields._id = req.params.id;
        // console.log(fields);
        var schema = {
            _id: Joi.string().required().regex(/^[0-9a-fA-F]{24}$/).error(new Error('用户id非法'))
        }
        let { error } = Joi.validate(fields, schema, {
            // 允许对象包含被忽略的未知键
            allowUnknown: true
        });
        if (error) {
            res.status(400).send(error.message);
        }
        // 通过验证
        // 更新用户信息
        // new: true 返回修改后的文档 默认值为false 返回原始文档
        // fields: '-password'} 从返回值中抛除密码字段
        let user = await User.findOneAndUpdate({ _id: fields._id }, { $set: fields }, { new: true, fields: '-password' })
        res.send(user);
    });
}