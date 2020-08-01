# email-server

邮件系统

# 邮件配置
```
const senderConfig = {
    service: '126', // 邮件系统 163, 126, qq, gmail, 查看支持列表：https://nodemailer.com/smtp/well-known/
    port: 465, // 使用的端口 SMTP: 465, POP3S: 995, IMAPS: 993,
    userName: 'Test', // 发件人的名称
    user: '', // 发件的邮件账号 test@126.com
    pass: '', // 发件邮件帐户对应 端口 的授权码
};
```

# 邮件发送系统
1. index.js 里面修改对应的邮件信息
2. 在 data.js 里面配置对应的数据
3. node index.js 启动
4. 127.0.0.1访问 邮件发送 页面

# 邮件开发预览
1. index.js 里面修改对应文件路径
2. 在 data.js 里面配置对应的数据
3. node index.js 启动
4. 127.0.0.1/dev/+对应文件在build的路径 访问

预览需要手动刷新页面

## 示例

访问：127.0.0.1/dev/test/index.html

实际路径：basePath/test/index.html

文件夹路径：build/test/index.html