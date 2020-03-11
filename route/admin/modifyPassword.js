const bcrypt = require('bcrypt');
const Formidable = require('formidable');
const { User } = require('../../model/user');
module.exports = (req, res) => {
    var formidable = new Formidable.IncomingForm();
    formidable.parse(req, async(error, fields, files) => {
        console.log(fields);

        if (req.session.userInfor) {
            var flag = bcrypt.compare(fields.old, req.session.password);
            if (flag) {

                if (fields['news'] == fields['confirm']) {
                    // 更新密码
                    // 生成盐
                    const salt = await bcrypt.genSalt(10);
                    const finalPass = await bcrypt.hash(fields['news'], salt);
                    await User.findByIdAndUpdate({ _id: req.session.userInfor._id }, { $set: { password: finalPass } });
                    req.session.userInfor = null;
                    req.session.isLogin = false;
                    res.send({ message: '密码修改成功' });
                } else {
                    res.status(400).send({ message: '俩次密码不一致' });
                }
            } else {
                res.status(400).send({ message: '原密码不正确' });
            }
        } else {
            res.status(400).send({ message: '请先登录' });
        }

    })

}