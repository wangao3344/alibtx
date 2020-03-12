const { Category } = require('../../model/category');
const Formidable = require('formidable');
module.exports = (req, res) => {
    var formidable = new Formidable.IncomingForm();
    formidable.parse(req, async(err, fields, files) => {
        var category = await Category.create(fields);
        res.send(category);
    });


}