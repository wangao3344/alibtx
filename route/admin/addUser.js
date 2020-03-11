const { User, verifyUser, createUser } = require('../../model/user');
const Formidable = require('formidable');
module.exports = async(req, res) => {
    // var { email, username, icon, isActive, roles, password } = req.body
    var formidable = new Formidable.IncomingForm();
    formidable.parse(req, async(err, fields, files) => {
        var { icon, email, username, isActive, roles, password } = fields;
        console.log(icon);
        try {
            await verifyUser(fields);
            var result = createUser(fields);
        } catch (error) {
            res.send(error.message)
        }
        res.send(result);
    })




}