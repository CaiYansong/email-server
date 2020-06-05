const formidable = require('formidable');
const fs = require("fs");
const sendEmail = require('./src/sendEmail');

const express = require("express");
const app = express();

app.use(express.static('./static'));

app.post('/sendEmail', function (req, res) {
    var form = new formidable.IncomingForm();
    form.uploadDir = './upload'; // 上传文件的存放地址
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

        // 获取 html 字符串
        getHtml(file.html.path).then((html) => {
            const { title, receivers, port, service, userName, user, pass } = params;
            // 邮件配置
            const senderConfig = {
                port: Number(port),
                service,
                userName,
                user,
                pass,
            };
            const contentObj = {
                title,
                html,
            };

            // 发送邮件
            sendEmail(senderConfig, receivers, contentObj).then(() => {
                res.json({
                    success: true,
                    msg: 'send success',
                });
            }).catch((err) => {
                console.log('sendEmail', err);
                res.json({
                    success: false,
                    msg: 'send error',
                });
            });
        });
    });
});

function getHtml(filename) {
    var buf = new Buffer.alloc(1024);

    return new Promise((resolve, reject) => {
        fs.open(filename, 'r+', function (err, fd) {
            if (err) {
                return console.error(err);
            }
            fs.read(fd, buf, 0, buf.length, 0, function (err, bytes) {
                if (err) {
                    reject(err);
                    return;
                }

                // 仅输出读取的字节
                if (bytes > 0) {
                    var str = buf.slice(0, bytes).toString();
                    resolve(str);
                }

                // 关闭文件
                fs.close(fd, function (err) {
                    if (err) {
                        console.log(err);
                    }
                });
            });
        });
    });
}

// 监听端口
app.listen(80, function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log('success');
    }
});