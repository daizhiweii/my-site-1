// 打包结果分析工具
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

if (process.env.NODE_ENV === "production") { // 生产环境
  module.exports = {
    // devtool: "none", // 表示打包后不需要生成source-map源码地图
    plugins: [new BundleAnalyzerPlugin()],
    // 使用CDN（内容分发网络）优化打包体积
    // 不需要打包的资源（通常为免费CDN上提供的公共资源）
    // 需要在./public/index.html引用这些CDN资源
    externals: {
      vue: "Vue", // 导入vue时不要打包，并告知会提供一个全局变量Vue。下同
      vuex: "Vuex", 
      "vue-router": "VueRouter", 
      axios: "axios",
    }
  };
} else {
  module.exports = {};
}