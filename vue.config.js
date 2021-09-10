// vue-cli的配置文件
module.exports = {
  devServer: {
    proxy: {
      "/api": {
        target: "https://test.my-site.com"
        // 后端提供的数据服务器地址，若没有开发完成则需要自己用mock模拟数据
      }
      // 当请求路径以/api开头时，转发到`target`发送请求
    }
  },
  configureWebpack: require("./webpack.config.js"),
  publicPath: process.env.NODE_ENV === 'production'
    ? '/my-site-1/dist/'
    : '/',
}
// vue-cli同webpack一样都是在node环境中运行，故使用CommonJS模块化方式导出