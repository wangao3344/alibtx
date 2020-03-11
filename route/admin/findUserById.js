const { User } = require('../../model/user');
module.exports = async(req, res) => {
    var id = req.params.id
    var user = await User.findOne({ _id: id }).select('-password');
    res.send(user);
}