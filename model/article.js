const mongoose = require("mongoose");
const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, '文章标题不能为空'],
        minlength: 1,
        maxlength: 16
    },
    content: {
        type: String,
        required: [true, '文章标题不能为空'],
    },
    articlePic: {
        type: String,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: [true, '分类字段不能为空'],
    },
    publishDate: {
        type: Date,
        default: Date.now
    },
    status: {
        // true:已发布 false:草稿
        type: Number,
        default: 0,
    }
});
const Article = mongoose.model('Article', articleSchema);
module.exports = {
    Article,
}