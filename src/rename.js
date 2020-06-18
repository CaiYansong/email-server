const fs = require("fs");
const path = require("path");

const uploadDir = './upload';

function rename(name = '', oldPath = '') {
    // 当前时间戳
    const t = Date.now();
    // 生成随机数
    const ran = parseInt(Math.random() * 8999 + 10000);
    // 拿到扩展名
    const extname = path.extname(name);
    // 拿到老的文件名称
    const oldName = name.replace(extname, '');
    // 新的路径
    const newPath = uploadDir + '/' + oldName + '-' + t + '-' + ran + extname;
    // 改名
    fs.rename(oldPath, newPath, function (err) {
        if (err) {
            console.log('Rename Error', err);
        }
    });
}

module.exports = rename;