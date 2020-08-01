/**
 * 模拟邮件发送系统，去除会被过滤的内容
 * @param {*} html 
 * @param {*} removeClass 是否删除class
 */
function mockEmailSys(html, removeClass) {
    // 只读取body里面的内容
    html = html.replace(/[\s\S]*<body[^>]*>([\s\S]*)<\/body>[\s\S]*/, '$1');
    if (removeClass) {
        // 清除class
        const classReg = /class="[^"]*"/ig;
        html = html.replace(classReg, '');
    }
    // 清除负的margin
    const negativeMarginReg = /margin[^:]*:[^;:]*-[^;]+;?/ig;
    html = html.replace(negativeMarginReg, '');
    // 清除 float
    const floatReg = /float[^:]*:[^;:]+;?/ig;
    html = html.replace(floatReg, '');
    // 清除 box-sizing
    const boxSizingReg = /box-sizing[^:]*:[^;:]+;?/ig;
    html = html.replace(boxSizingReg, '');
    // 清除 box-shadow
    const boxShadowReg = /box-shadow[^:]*:[^;:]+;?/ig;
    html = html.replace(boxShadowReg, '');
    // 清除 display: flex
    const flexReg = /display[^:]*:[^;:]*flex[^;:]*;?/ig;
    html = html.replace(flexReg, '');
    // 清除 tr、td 上的 margin
    const marginReg = /margin[^:]*:[^;:]*;?/ig;
    const trdMarginReg = /<t[rd][^>]+style="[^>]*(margin[^:>]*:[^;:>]+;?)+[^>]*>/ig;
    html = html.replace(trdMarginReg, (match, $1) => {
        return match.replace(marginReg, '');;
    });
    // 清除 background-size
    const backgroundSize = /background-size[^:]*:[^;:]*;?/ig;
    html = html.replace(backgroundSize, '');

    return html;
}

module.exports = mockEmailSys;