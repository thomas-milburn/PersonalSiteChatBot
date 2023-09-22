// eslint-disable-next-line @typescript-eslint/no-var-requires
const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = (app) => {
  app.use(
    createProxyMiddleware('/chat', {
      target: 'http://127.0.0.1:8000',
      pathFilter: '/chat',
      changeOrigin: true,
      ws: true
    })
  )
}
