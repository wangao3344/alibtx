module.exports = (req, res) => {
    // 该方法会清空session中存储的数据
    req.session.destroy(err => {
        if (!err) {
            res.clearCookie('connect-sid');
            res.send({ msg: '退出成功' })
        } else {
            res.status(400).send({
                msg: '退出失败'
            })
        }
    });
}