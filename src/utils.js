
/**
 * 获取url的参数
 * @param {String} name
 */
function getUrlParam(query, variable) {
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        if (pair[0] == variable) {
            return pair[1];
        }
    }
    return '';
}


module.exports = {
    getUrlParam,
}