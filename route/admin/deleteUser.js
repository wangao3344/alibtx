const { User } = require('../../model/user');
const fs = require('fs');
const path = require('path');
const Joi = require('joi');
const { promisify } = require('util');
const unlink = promisify(fs.unlink);
module.exports = async(req, res) => {
    var id = req.params.id;
    const schema = Joi.string().required().regex(/^[0-9a-fA-F]{24}$/).error(new Error('用户id不符合格式'));
    if (id.indexOf('-') !== -1) {
        var arr = id.split('-');
        // console.log(arr);
        var result = [];
        // 遍历分别进行验证
        arr.forEach(items => {
            console.log(items);
            var { error } = Joi.validate(items, schema);

            if (error) {
                return res.status(400).send({ message: error.message });
            }

        });
        // 验证通过
        arr.forEach(async(items) => {
            var user = await User.findByIdAndDelete({ _id: items });
            if (user.icon) {
                // 删除头像
                await unlink(path.join(__dirname, '../../', 'public', user.icon));
            }
            result.push(user);
        })
        res.send(result);

    } else {
        // 删除一个
        var { error } = Joi.validate(id, schema);
        if (error) {
            return res.status(400).send(error.message);
        }
        let user = await User.findByIdAndDelete(id);
        // 如果缩略图存在
        if (user.icon) {
            // 删除缩略图
            await unlink(path.join(__dirname, '../', '../', 'public', user.icon));
        }
        // 响应
        res.send(user);

    }
}