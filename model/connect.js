const mongoose = require('mongoose');
mongoose
    .connect('mongodb://admin:wa5069369@127.0.0.1:27017/ali', { useNewUrlParser: true, useUnifiedTopology: true })
    .catch(err => {
        console.log(err);

    })
    .then(() => {
        console.log("数据库连接成功");

    });
// 使用老方法 findOneAndUpdate
mongoose.set('useFindAndModify', false);