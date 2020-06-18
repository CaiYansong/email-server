const fs = require("fs");

/**
 * 读取大文件
 * @param {string} path 
 */
function readFile(path) {
    return new Promise((resolve, reject) => {
        var input = fs.createReadStream(path);
        // 中文: utf8  二进制: binary
        input.setEncoding("utf8");
        var remaining = "";

        input.on("data", function (data) {
            remaining += data;
        });

        input.on("end", function () {
            if (remaining.length > 0) {
                resolve(remaining);
            } else {
                reject('');
            }
        });
    });
}

module.exports = readFile;