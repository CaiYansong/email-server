// 利用 velocityjs 模版引擎处理数据
const Velocity = require('velocityjs');
const data = require('./data');

/**
 * 处理email的数据
 */
function handleEmailData(html) {
    if (typeof html !== 'string') {
        return '';
    }
    // 只读取body里面的内容
    let res = html.replace(/[\s\S]*<body[^>]*>([\s\S]*)<\/body>[\s\S]*/, '$1');

    // 数据
    const context = data;
    const macros = {};

    res = Velocity.render(res, context, macros);

    return res;
}

module.exports = handleEmailData;