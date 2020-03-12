const Joi = require('joi');
const { Category } = require('../../model/category');
module.exports = async(req, res) => {
    let { id } = req.params;
    const schema = Joi.string().required().regex(/^[0-9a-fA-F]{24}$/).error(new Error('用户id非法'));
    const { error } = Joi.validate(id, schema);
    if (error) return res.status(400).send({ message: error.message });
    var category = await Category.findOne({ _id: id });
    res.send(category);
}