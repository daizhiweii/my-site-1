// 入口文件

import "./mock"; // 导入模拟数据
import Vue from 'vue'; // 导入vue
import App from './App.vue'; // 导入根组件
import "./styles/global.less"; // 导入全局样式
import router from "@/router"; // 导入路由实例
import { showMessage } from "@/utils"; // 导入工具函数showMessage
// 将showMessage方法注入到Vue原型上以方便后续使用
Vue.prototype.$showMessage = showMessage;

import store from "@/store"; // 注册仓库
store.dispatch("setting/fetchSetting"); // 获取全局共享数据存入仓库

// 注册全局指令
import vLoading from "@/directives/loading";
import vLazy from "@/directives/lazy";
Vue.directive("loading", vLoading); // 指令名称，指令配置
Vue.directive("lazy", vLazy);

import "./eventBus"; // 执行一遍事件总线

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app');

/**
 * blog api测试代码
 */
// import * as blogApi from "@/api/blog";
// // 文章列表页：
// // 获取所有博客分类
// blogApi.getBlogTypes().then(r => {
//   console.log("博客分类", r)
// })
// // 分页获取博客
// blogApi.getBlogs(2, 20, 3).then(r => {
//   console.log("博客", r)
// }) 
// // 文章详情页：
// // 获取单个博客
// blogApi.getBlog("123456").then(r => console.log("单个博客", r))
// // 提交评论
// blogApi.postComment({
//   nickname: "昵称",
//   content: "评论内容，纯文本",
//   blogId: "123", // 博客id，评论了哪篇博客 
// }).then(r => console.log("提交评论", r));
// // 分页获取评论
// blogApi.getComments("123123", 1, 10).then(r => console.log("获取评论", r));

/**
 * 测试事件总线
 */
// import eventBus from "./eventBus";
// function handler1(data) {
//   console.log("handler1", data);
// }
// function handler2(data) {
//   console.log("handler2", data);
// }
// eventBus.$on("event1", handler1);
// eventBus.$on("event1", handler2);
// eventBus.$on("event2", handler1);
// window.eventBus = eventBus;
// window.handler1 = handler1;
// window.handler2 = handler2

// 测试setting api
// import {getSetting} from "./api/setting";
// getSetting().then((resp)=> {
//   console.log(resp);
// })