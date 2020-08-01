const fs = require("fs");

/**
 * 读取大文件
 * @param {string} path 
 */
function readFile(path) {
    return new Promise((resolve, reject) => {
        // 先判断文件是否存在
        fs.exists(path, function (exists) {
            if (exists) {
                var input = fs.createReadStream(path);
                // 中文: utf8  二进制: binary ascii  base64
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
            } else {
                reject('Error: file does not exist!');
            }
        });
    });
}

module.exports = readFile;