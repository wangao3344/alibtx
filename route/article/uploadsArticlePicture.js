const Formidable = require("formidable");
const path = require("path");
const fs = require("fs");
module.exports = (req, res) => {
    const formidable = new Formidable.IncomingForm({
        multiples: true,
        keepExtensions: true,
        uploadDir: path.join(__dirname, '../../', 'public', 'uploads'),
    });
    var filesArray = [];
    formidable.on('file', function(fields, files) {
        // console.log(files.path);
        filesArray.push({
            articlePic: files.path.split('public')[1]
        })
    });
    // formidable.on('end', function() {
    //     console.log(filesArray);
    // });

    formidable.parse(req, (err, fields, files) => {
        if (err) {
            res.send(err);
            return
        }
        // console.log(files);
        res.send(filesArray);
    });


}