const mjml2html = require('mjml');

const bodyParser = require('body-parser');
const fs = require("fs");

const receiveFile = require('./src/receiveFile');
const readFile = require('./src/readFile');
const sendEmail = require('./src/sendEmail');
const rename = require('./src/rename');
const handleEmailData = require('./src/handleEmailData');
const mockEmailSys = require('./src/mockEmailSys');

const utils = require('./src/utils');

// 邮件配置
const {
    defaultService,
    defaultPort,
    defaultUserName,
    defaultUser,
    defaultPass,
} = require('./src/defaultSenderConfig');

const express = require("express");
const app = express();
app.use(bodyParser.json());

const basePath = '/Users/cys/workbench/email-templates/build';

app.use(express.static('./static'));

app.post('/sendEmail', function (req, res) {
    receiveFile(req, res).then(({ name, path, params }) => {
        // 获取 html 字符串
        readFile(path).then((html) => {
            html = handleEmailData(html);
            const { title, receivers, port, service, userName, user, pass } = params;

            // 邮件配置
            const senderConfig = {
                port: Number(port) || defaultPort,
                service: service || defaultService,
                userName: userName || defaultUserName,
                user: user || defaultUser,
                pass: pass || defaultPass,
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
                    msg: err,
                    html,
                });
            });

            // 重命名
            rename(name, path);
        }).catch((err) => {
            res.json({
                success: false,
                msg: err,
                html: '',
            });
        });
    }).catch((err) => {
        res.json({
            success: false,
            msg: err,
            html: '',
        });
    });
});

app.post('/previewEmail', function (req, res) {
    receiveFile(req, res).then(({ name, path, params }) => {
        // 获取 html 字符串
        readFile(path).then((html) => {
            html = handleEmailData(html);
            html = mockEmailSys(html, true);
            // 删除预览的文件
            fs.unlink(path, function (err) {
                if (err) {
                    return console.error(err);
                }
                console.log("预览文件删除成功！");
            });
            res.json({
                success: true,
                msg: 'back success',
                html,
            });
        }).catch((err) => {
            res.json({
                success: false,
                msg: err,
                html: '',
            });
        });
    }).catch((err) => {
        res.json({
            success: false,
            msg: err,
            html: '',
        });
    });
});

// 编译MJML文件并处理数据 
app.post('/compileAndHandleData', function (req, res) {
    const { mjml, removeClass, isHandleData } = req.body;

    const options = {};
    let { html } = mjml2html(mjml, options);

    if (isHandleData) {
        html = handleEmailData(html);
    }
    html = mockEmailSys(html, removeClass);
    res.json({
        success: true,
        msg: 'back success',
        html,
    });
});

app.get('/dev/*', function (req, res) {
    const url = req.url.replace('/dev', '');
    const pathName = url.replace(/\?.*/, '');
    let search = '';
    if (url.indexOf('?') >= 0) {
        search = url.replace(/.*\?/, '');
    }

    const path = `${basePath}${pathName}`;
    const isRemoveClass = utils.getUrlParam(search, 'removeClass') === 'true';

    // 获取 html 字符串
    readFile(path).then((html) => {
        html = handleEmailData(html);
        html = mockEmailSys(html, isRemoveClass);
        res.end(`<!DOCTYPE html><html lang="en"><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"></head><body>${html}</body></html>`);
    }).catch((err) => {
        res.end(`<!DOCTYPE html><html lang="en"><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"></head><body>${err}</body></html>`);
    });
});

// 监听端口
app.listen(80, function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log('Email server start.');
    }
});
