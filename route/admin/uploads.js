const Formidable = require('formidable');
const path = require('path');
module.exports = (req, res) => {
    var formidable = new Formidable.IncomingForm();
    var file_path = path.join(__dirname, '../../', 'public', 'uploads');
    // console.log(file_path);
    // 上传图片的保存目录
    formidable.uploadDir = file_path;
    // 保留图片默认样式
    formidable.keepExtensions = true;
    formidable.parse(req, (err, fields, files) => {
        console.log(files.icon.path);
        if (!err) {
            res.send(JSON.stringify({ url: files.icon.path.split('public')[1] }));
        }


    })

}