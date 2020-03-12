const mongoose = require('mongoose');
const categorySchema = new mongoose.Schema({
    categories: {
        type: String,
        maxlength: 16,
        minlength: 2,
        required: [true, '分类名称必填字段']
    },
    className: {
        type: String,
    },

});
const Category = mongoose.model('Category', categorySchema);
module.exports = {
    Category
}