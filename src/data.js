
const products = [
    {
        productImage: 'https://ae01.alicdn.com/kf/H3f1680cf3cfc4cc09670a11cd288b2aem.png',
        productName: 'product name',
        oriPrice: 'US $120.00',
        minPrice: 'US $10.00',
        color: 'eee',
    },
    {
        productImage: 'https://ae01.alicdn.com/kf/H295b61fcbe604327bb38faffa59f37e61.jpg',
        productName: 'product name',
        oriPrice: 'US $190.00',
        minPrice: 'US $80.00',
        color: 'eee',
    },
    {
        productImage: 'https://ae01.alicdn.com/kf/H7e8d9a642f124c0d8a11575225d8919dT.jpg',
        productName: 'product name',
        oriPrice: 'US $200.00',
        minPrice: 'US $90.00',
        color: 'eee',
    },
    {
        productImage: 'https://ae01.alicdn.com/kf/H108c99ba6cc74f3fb942055ac8356c34y.jpg',
        productName: 'product name',
        oriPrice: 'US $1000.00',
        minPrice: 'US $400.00',
        color: 'eee',
    },
];

const rewards = [
    {
        rewardItemImg: 'https://ae01.alicdn.com/kf/H3f1680cf3cfc4cc09670a11cd288b2aem.png',
        rewardItemTitle: 'reward Item Title',
    },
    {
        rewardItemImg: 'https://ae01.alicdn.com/kf/H295b61fcbe604327bb38faffa59f37e61.jpg',
        rewardItemTitle: 'reward Item Title',
    },
    {
        rewardItemImg: 'https://ae01.alicdn.com/kf/H7e8d9a642f124c0d8a11575225d8919dT.jpg',
        rewardItemTitle: 'reward Item Title',
    },
    {
        rewardItemImg: 'https://ae01.alicdn.com/kf/H108c99ba6cc74f3fb942055ac8356c34y.jpg',
        rewardItemTitle: 'reward Item Title',
    },
];

// 处理数据长度，和模版的条件保持一致
products.length = 3;

const data = {
    headerImg: 'https://ae01.alicdn.com/kf/H0e0fa582a0b54083be6b44a883f3103fG.png',
    couponLeftImg: 'https://ae01.alicdn.com/kf/Hd91f3f5ddcd14139bc5cd5c367978446w.png',
    memberReward: 'memberReward',
    earnPointsTips: 'earnPointsTips',
    seeMore: 'seeMore',
    viewMore: 'viewMore',
    earningPoints: 'earningPoints',
    rewardsTitle: 'And you have this rewards',
    rewards,
    productsTitle: 'productsTitle',
    recommendItems: [products],
};

module.exports = data;