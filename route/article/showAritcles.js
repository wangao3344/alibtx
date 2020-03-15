const pagination = require('mongoose-sex-page');
const { Article } = require("../../model/article");
module.exports = async(req, res) => {
    var page = req.query.page || 1;
    var articles = await pagination(Article).page(page).size(2).display(4).find().populate('author', '-password').populate('category').select('-content').exec();
    res.send(articles);
}