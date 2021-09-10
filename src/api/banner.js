// 13.(使用axios)获取远程数据

/*
例：
import axios from "axios";
async function getNews() {
  const resp = await axios.get(
    // https://www.zhihu.com/api/v4/answer_later/count
    // 请求知乎的某条数据，有限制故看不到结果
    // "https://localhost:8080/api/v4/answer_later/count"
    "/api/v4/answer_later/count"
    // 省略协议域名端口号，默认为当前网页协议域名端口号，
    // 后续在生产环境静态资源服务器和数据服务器为同一个服务器时则不需要更改
  );
  console.log(resp);
  console.log(resp.data);
}
getNews();
*/

import request from "./request";

export async function getBanners() {
  // if (resp.data.code === 0) {
  //   return resp.data.data;
  // }
  // showMessage({
  //   content: resp.data.msg,
  //   type: "error",
  // });
  // 使用拦截器函数实现此部分功能
  
  return await request.get("/api/banner");
  // 被mock拦截：得到模拟数据
  // 没被mock拦截：
  // 向当前网页 协议域名端口号/api/banner 请求数据，
  // 根据vue-cli的配置文件vue.config.js的代理配置，
  // 向https://test.my-site.com/api/banner请求数据
  // 如：
  // 向开发服务器https://localhost.8080//api/banner请求数据，
  // 根据vue-cli的配置文件vue.config.js的代理配置，
  // 再由开发服务器向https://test.my-site.com/api/banner请求数据，
  // 开发服务器得到数据后再将其返回给浏览器
  // 可以避免跨域问题
}