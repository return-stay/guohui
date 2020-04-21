const proxy = require('http-proxy-middleware')
module.exports = function (app) {
    // ...You can now register proxies as you wish!
    // app.use(proxy('/randy', {
    //     target: 'http://39.97.231.232:8806/',
    //     secure: false,
    //     changeOrigin: true,
    //     pathRewrite: {
    //         "^/randy": ""
    //     },
    // }));
    app.use(proxy('/peter', {
        target: 'http://172.19.5.34:9531',
        secure: false,
        changeOrigin: true,
        pathRewrite: {
            "^/peter": ""
        },
    }));
    // app.use(proxy('/product/findByPage', {
    //     target: 'http://39.97.231.232:8806/',
    //     secure: false,
    //     changeOrigin: true,
    //     pathRewrite: {
    //         "^/randy": ""
    //     },
    // }));
};