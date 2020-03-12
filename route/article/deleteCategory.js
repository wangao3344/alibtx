const Joi = require('joi');
const { Category } = require('../../model/category');
module.exports = async(req, res) => {
    var id = req.params.id;
    const schema = Joi.string().required().regex(/^[0-9a-fA-F]{24}$/).error(new Error('用户id非法'));
    if (id.indexOf('-') === -1) {
        let { error } = Joi.validate(id, schema);
        if (error) return res.status(400).send({ message: error.message });
        var cate = await Category.findByIdAndDelete({ _id: id });
        res.send(cate)

    } else {
        var arrs = id.split('-');
        var result = [];
        arrs.forEach(item => {
            let { error } = Joi.validate(item, schema);
            if (error) return res.status(400).send({ message: error.message });
        });
        arrs.forEach(async(item) => {
            var cate = await Category.findByIdAndDelete({ _id: item });
            result.push(cate);
        });
        res.send(result);

    }
}