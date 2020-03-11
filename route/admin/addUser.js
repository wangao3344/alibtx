const { User, verifyUser, createUser } = require('../../model/user');
const Formidable = require('formidable');
module.exports = (req, res) => {
    // var { email, username, icon, isActive, roles, password } = req.body
    var formidable = new Formidable.IncomingForm();
    formidable.parse(req, async(err, fields, files) => {
        var { icon, email, username, isActive, roles, password } = fields;
        console.log(fields);
        try {
            await verifyUser(fields);
            var result = await createUser(fields);
        } catch (error) {
            res.send(error);
        }
        res.send(result);
    })




}