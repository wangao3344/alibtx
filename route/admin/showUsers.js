const { User } = require('../../model/user');
module.exports = async(req, res) => {
    try {
        var list = await User.find({}).select('-password').sort('-createTime');
    } catch (error) {
        res.status(400).send('获取数据失败')
    }
    res.send(list);

}