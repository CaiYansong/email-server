const defaultSenderConfig = {
    defaultService: '126', // 邮件系统 163, 126, qq, gmail,
    defaultPort: 465, // 使用的端口 SMTP: 465, POP3S: 995, IMAPS: 993,
    defaultUserName: 'CYS Test', // 发件人的名称
    defaultUser: '', // 发件的邮件账号 test@126.com
    defaultPass: '', // 发件邮件帐户对应 端口 的授权码
};

module.exports = defaultSenderConfig;
