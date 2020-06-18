const fs = require("fs");

/**
 * 读取大文件
 * @param {string} path 
 */
function readFile(path) {
    return new Promise((resolve, reject) => {
        var input = fs.createReadStream(path);
        input.setEncoding("binary");
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