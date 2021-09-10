import Vue from "vue";
import VueRouter from "vue-router";
// 不写路径则默认从node_modules目录中导入
import routes from "./router";
import { titleController } from "@/utils";

// window.VueRouter不存在，说明不是用cdn传统方式引入，需要注册插件（详见public/index.html）
if (!window.VueRouter) {
  Vue.use(VueRouter);
  // 使用一个vue插件VueRouter，会全局注册RouterView和RouterLink组件
}

const router = new VueRouter({
  // 配置
  routes, // 路由匹配规则
  mode: "history",
  // history模式从浏览器的location.pathname获取路径，
  // 不再从location.hash获取，
  // 如/about#blog得到/about，
  // 但改变location.pathname会导致页面刷新，想要页面不刷新需要用到 history API，
  // 如 history.pushState(null, null, "/blog")
  // vue-router内部就是使用它来改变地址（自己手动使用的话vue-router监控不到，hash能被监控到）
});

// 导航守卫——全局解析守卫
// 路由变化时运行，一开始会运行一次
router.afterEach((to, from) => {
  if (to.meta.title) { // 路由的自定义属性meta.title有值
    titleController.setRouteTitle(to.meta.title);
  }
});

if (process.env.NODE_ENV === 'production') {
  router.beforeEach((to, from, next) => {
    if (to.fullPath === "/my-site-1/dist/") {
      next({ name: "Home" });
    } else {
      next();
    }
  })
}

export default router;