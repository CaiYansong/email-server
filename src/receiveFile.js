const formidable = require('formidable');

const uploadDir = './upload';

function receiveFile(req, res) {
    return new Promise((resolves) => {
        const form = new formidable.IncomingForm();
        form.uploadDir = uploadDir; // 上传文件的存放地址
        form.encoding = 'utf-8'; // 上传的编码格式
        form.keepExtensions = true; // 是否保留文件的扩展名
        form.parse(req, function (err, params, file) {
            // params: 文本数据
            // file: 文件数据
            // file[name].size = 0; // ---->上传文件为空，未选择上传的文件， 0字节
            if (err) {
                console.log('form Error', err);
                res.json({
                    success: false,
                    msg: 'form error',
                });
                return;
            }
            resolves({
                name: file.html.name,
                path: file.html.path,
                params
            });
        });
    });
}

module.exports = receiveFile;