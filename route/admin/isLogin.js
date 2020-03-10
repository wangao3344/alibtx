module.exports = (req, res) => {
    var isLogin = req.session.isLogin;
    // 原样字符串
    res.send(`var isLogin =${isLogin}`);
}