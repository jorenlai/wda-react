const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = (app) => {

    app.use(createProxyMiddleware('/api', {
        target: process.env.api_url
        ,changeOrigin: true
    }));
}

