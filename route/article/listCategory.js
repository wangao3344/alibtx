const { Category } = require('../../model/category');
module.exports = async(req, res) => {
    var categories = await Category.find({}).sort('createTime');
    // console.log(categories);
    res.send(categories);

};