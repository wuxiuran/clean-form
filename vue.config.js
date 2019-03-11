module.exports = {
  productionSourceMap: process.env.NODE_ENV === 'production' ? false : true,
  baseUrl: '/',
  publicPath: '/static/',
  assetsDir: 'static'
}