const { User, verifyUser, createUser } = require('../../model/user');
module.exports = async(req, res) => {
    // var { email, username, icon, isActive, roles, password } = req.body
    try {
        await verifyUser(req.body);
        var result = createUser(req.body);
    } catch (error) {
        res.send(error.message)
    }
    res.send(result);

}