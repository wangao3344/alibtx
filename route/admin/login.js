const bcrypt = require('bcrypt');
const { User } = require('../../model/user');
module.exports = async(req, res) => {
    let { email, password } = req.body;
    let result = await User.findOne({ email: email });
    if (!result) {
        res.status(400).send({ msg: '用户或密码错误' });
        return
    }
    var flag = await bcrypt.compare(password, result.password);
    // console.log(flag);
    if (flag) {
        // 公共数据
        req.app.locals.user = result;
        // 存储到session中
        req.session.username = result.username;
        req.session.isLogin = true;
        console.log(req.session.isLogin);

        res.send(result);
    } else {
        res.status(400).send({ msg: '用户或密码错误' });
    }



}