let proxyObj = {}
    proxyObj['/'] = {
      ws: false,
      target: 'http://localhost:8080',
      changeOrigin: true,
      pathRewrite: {
        '^/': ''
      }
    }
module.exports = {
    devServer:{
        open: true,
        port:8001,
        proxy:proxyObj
    }
}