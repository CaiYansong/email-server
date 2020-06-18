const products = [
    {
        img: 'https://ae01.alicdn.com/kf/H3f1680cf3cfc4cc09670a11cd288b2aem.png',
        name: 'product name',
        oriPrice: 'US $120.00',
        minPrice: 'US $10.00',
        color: 'eee',
    },
    {
        img: 'https://ae01.alicdn.com/kf/H295b61fcbe604327bb38faffa59f37e61.jpg',
        name: 'product name',
        oriPrice: 'US $190.00',
        minPrice: 'US $80.00',
        color: 'eee',
    },
    {
        img: 'https://ae01.alicdn.com/kf/H7e8d9a642f124c0d8a11575225d8919dT.jpg',
        name: 'product name',
        oriPrice: 'US $200.00',
        minPrice: 'US $90.00',
        color: 'eee',
    },
    {
        img: 'https://ae01.alicdn.com/kf/H108c99ba6cc74f3fb942055ac8356c34y.jpg',
        name: 'product name',
        oriPrice: 'US $1000.00',
        minPrice: 'US $400.00',
        color: 'eee',
    },
];

/**
 * 处理email的数据
 */
function handleEmailData(html) {
    if (typeof html !== 'string') {
        return '';
    }
    // 只读取body里面的内容
    let res = html.replace(/[\s\S]*<body>([\s\S]*)<\/body>[\s\S]*/, '$1');
    const ifReg = /#if.+/g;
    if (ifReg.test(res)) {
        res = res.replace(ifReg, '');
    }
    const endReg = /#end/g;
    if (endReg.test(res)) {
        res = res.replace(endReg, '');
    }

    products.forEach((item, index) => {
        const nameReg = new RegExp(`\\$!\\{recommandResult\\.recommendProducts\\.get\\(${index}\\)\\.productName\\}`, 'g');
        if (nameReg.test(res)) {
            res = res.replace(nameReg, item.name);
        }
        const imgUrlReg = new RegExp(`\\$!\\{recommandResult\\.recommendProducts\\.get\\(${index}\\)\\.productImage\\}`, 'g');
        if (imgUrlReg.test(res)) {
            res = res.replace(imgUrlReg, item.img);
        }
        const p_imgUrlReg = new RegExp(`\\$!\\{p\\.productImg\\}`, 'g');
        if (p_imgUrlReg.test(res)) {
            res = res.replace(p_imgUrlReg, item.img);
        }
        const p_imgUrlReg1 = new RegExp(`\\$!\\{p\\.productImage\\}`, 'g');
        if (p_imgUrlReg1.test(res)) {
            res = res.replace(p_imgUrlReg1, item.img);
        }
        const originMinPriceReg = new RegExp(`\\$!\\{recommandResult\\.recommendProducts\\.get\\(${index}\\)\\.oriMinPrice\\}`, 'g');
        if (originMinPriceReg.test(res)) {
            res = res.replace(originMinPriceReg, item.oriPrice);
        }
        const originPriceReg = new RegExp(`\\$!\\{recommandResult\\.recommendProducts\\.get\\(${index}\\)\\.oriPrice\\}`, 'g');
        if (originPriceReg.test(res)) {
            res = res.replace(originPriceReg, item.oriPrice);
        }
        const minPriceReg = new RegExp(`\\$!\\{recommandResult\\.recommendProducts\\.get\\(${index}\\)\\.minPrice\\}`, 'g');
        if (minPriceReg.test(res)) {
            res = res.replace(minPriceReg, item.minPrice);
        }
        const oriMinPriceReg = new RegExp(`\\$!\\{oriMinPrice\\}`, 'g');
        if (oriMinPriceReg.test(res)) {
            res = res.replace(oriMinPriceReg, item.minPrice);
        }
        const minPriceReg1 = new RegExp(`\\$!\\{minPrice\\}`, 'g');
        if (minPriceReg1.test(res)) {
            res = res.replace(minPriceReg1, item.minPrice);
        }
        const p_oriMinPriceReg = new RegExp(`\\$!\\{p\\.oriMinPrice\\}`, 'g');
        if (p_oriMinPriceReg.test(res)) {
            res = res.replace(p_oriMinPriceReg, item.minPrice);
        }
        const p_minPriceReg = new RegExp(`\\$!\\{p\\.minPrice\\}`, 'g');
        if (p_minPriceReg.test(res)) {
            res = res.replace(p_minPriceReg, item.minPrice);
        }
        const borderColorReg = new RegExp(`\\$!recommandResult\\.recommendProducts\\.get\\(${index}\\)\\.borderColor`, 'g');
        if (borderColorReg.test(res)) {
            res = res.replace(borderColorReg, item.color);
        }
        const p_borderColorReg = new RegExp(`\\$!\\{p\\.borderColor\\}`, 'g');
        if (p_borderColorReg.test(res)) {
            res = res.replace(p_borderColorReg, item.color);
        }
        const p_borderColorReg1 = new RegExp(`\\$!p\\.borderColor`, 'g');
        if (p_borderColorReg1.test(res)) {
            res = res.replace(p_borderColorReg1, item.color);
        }
        const bgColorReg = new RegExp(`\\$!bgColor`, 'g');
        if (bgColorReg.test(res)) {
            res = res.replace(bgColorReg, item.color);
        }
        const bgImageReg = new RegExp(`\\$!bgImgSrc`, 'g');
        if (bgImageReg.test(res)) {
            res = res.replace(bgImageReg, item.color);
        }
    });
    return res;
}

module.exports = handleEmailData;