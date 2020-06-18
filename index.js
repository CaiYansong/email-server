const receiveFile = require('./src/receiveFile');
const readFile = require('./src/readFile');
const sendEmail = require('./src/sendEmail');
const handleEmailData = require('./src/handleEmailData');
const rename = require('./src/rename');

const express = require("express");
const app = express();

app.use(express.static('./static'));

app.post('/sendEmail', function (req, res) {
    receiveFile(req, res).then(({ name, path, params }) => {
        // 获取 html 字符串
        readFile(path).then((html) => {
            html = handleEmailData(html);
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
                    html,
                });
            }).catch((err) => {
                console.log('sendEmail', err);
                res.json({
                    success: false,
                    msg: 'send error',
                    html,
                });
            });

            // 重命名
            rename(name, path);
        });
    });
});

// 监听端口
app.listen(80, function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log('success');
    }
});