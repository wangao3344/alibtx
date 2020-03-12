const Formiadable = require('formidable');
const Joi = require('joi');
const { Category } = require('../../model/category');
module.exports = (req, res) => {
    var id = req.params.id;
    const schema = Joi.string().required().regex(/^[0-9a-fA-F]{24}$/).error(new Error('用户id非法'));
    const { error } = Joi.validate(id, schema);
    if (error) return res.status(400).send({ message: error.message });
    const formidable = new Formiadable.IncomingForm();
    formidable.parse(req, async(err, fields, files) => {
        let cate = await Category.findByIdAndUpdate({ _id: id }, { $set: fields }, { new: true });
        res.send(cate);
    });
}