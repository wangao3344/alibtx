const { Article } = require('../../model/article');
const Formidable = require('formidable');
module.exports = (req, res) => {
    const formidable = new Formidable.IncomingForm();
    formidable.parse(req, async(err, fields, files) => {
        let { publishDate } = fields;
        publishDate = Date.parse(publishDate);
        fields.publishDate = publishDate;
        fields.author = req.session.userInfor._id;
        let result = await Article.create(fields);
        res.send(result);

    });
}