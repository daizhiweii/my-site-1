// 路由的匹配规则

// import Home from "@/views/Home";
// import About from "@/views/About";
// import Blog from "@/views/Blog";
// import Project from "@/views/Project";
// import Message from "@/views/Message";
// import Detail from "@/views/Blog/Detail";

import NotFound from "@/views/NotFound";

// nprogress库用来模拟进度条，并不是真实进度
import "nprogress/nprogress.css"; // 导入nprogress库css
import { start, done, configure } from "nprogress"; // 具名导入方便tree-shaking
configure({
  trickleSpeed: 20, // 进度条速度
  showSpinner: false, // 不显示加载时的小圈圈
});

// 模拟延迟效果
function delay(duration) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, duration);
  })
}

// 获取异步组件
function getPageComponent(pageCompResolver) {
  return async () => {
    // console.log("组件开始加载");
    start();
    console.log(process.env);
    if (process.env.NODE_ENV === "development") { // 开发模式模拟延迟效果
      // process是在node环境里的，而这段代码是在浏览器环境中执行的，
      // 此处可以使用是因为vue-cli在打包结果里向浏览器中注入了一些代码，
      // 创建了process对象，便于在浏览器环境中使用环境变量
      await delay(1000);
    }
    const comp = await pageCompResolver();
    // console.log("组件加载完成");
    done();
    return comp;
  }
}

// component: () => import(/* webpackChunkName: "home" */"@/views/Home"), 
// 等效于
// component: () => ({
//   component: import(/* webpackChunkName: "home" */"@/views/Home"),
//   loading: xxx,
//   delay: xxx,
//   详见 vue API -> 深入了解组件 -> 动态组件&异步组件 -> 异步组件 -> 处理加载状态
// })
// 路由懒加载，用到这个路由时再去加载这个组件，
// 动态import会生成一个新的chunk，打包后单独形成一个bundle，从而实现页面分包。
// 函数返回一个promise，promise完成后得到一个组件
// 在vue-router中是支持这种异步组件的
// 加载一次后不需要再次加载
// 写成下面这样就可以做一些额外的事情：
// component: async () => {
//   console.log("组件开始加载");
//   const comp = await import(/* webpackChunkName: "home" */"@/views/Home");
//   console.log("组件加载结束");
//   return comp;
// }
// 根据不同环境设置不同代码：
// component: async () => {
//   console.log("组件开始加载");
//   if (process.env.NODE_ENV === "development") { // 开发环境模拟延迟
//     await delay(2000);
//   }
//   const comp = await import(/* webpackChunkName: "home" */"@/views/Home");
//   console.log("组件加载结束");
//   return comp;
// }
// 每个组件都需要这么写，则封装为getPageComponent函数
// 函数参数不能直接传递路径，webpack打包时难以分析依赖关系
// 也不能传递import("xxx")，会过早导入
// 故传递一个函数返回import("xxx")
export default [
  {
    name: "Home",
    // path: "/",
    path: process.env.BASE_URL,
    // component: () => import(/* webpackChunkName: "home" */"@/views/Home"),
    component: getPageComponent(() =>
      import(/* webpackChunkName: "home" */"@/views/Home")
    ),
    meta: {
      title: "首页",
    },
  },
  {
    name: "About",
    // path: "/about"
    path: `${process.env.BASE_URL}about`,
    // component: () => import(/* webpackChunkName: "about" */"@/views/About"),
    component: getPageComponent(() =>
      import(/* webpackChunkName: "about" */"@/views/About")
    ),
    meta: {
      title: "关于我",
    }
  },
  {
    name: "Blog",
    // path: "/blog",
    path: `${process.env.BASE_URL}blog`,
    // component: () => import(/* webpackChunkName: "blog" */"@/views/Blog"),
    component: getPageComponent(() =>
      import(/* webpackChunkName: "blog" */"@/views/Blog")
    ),
    meta: {
      title: "文章",
    }
  },
  // mode为history时，根据location.pathname获取路径，
  // 如浏览器当前路径为/blog?123时可以与/blog匹配，/blog/cate/1则不行，
  // 匹配后会在<RouterView />处渲染相应组件
  {
    name: "CategoryBlog",
    // path: "/blog/cate/:categoryId",
    path: `${process.env.BASE_URL}blog/cate/:categoryId`,
    // component: () => import(/* webpackChunkName: "blog" */"@/views/Blog"),
    component: getPageComponent(() =>
      import(/* webpackChunkName: "blog" */"@/views/Blog")
    ),
    meta: {
      title: "文章",
    }
  },
  // :xxx为动态路由，此处:categoryId可以匹配任何路径
  {
    name: "Detail",
    // path: "/blog/:id",
    path: `${process.env.BASE_URL}blog/:id`,
    // component: () => import(/* webpackChunkName: "detail" */"@/views/Blog/Detail"),
    component: getPageComponent(() =>
      import(/* webpackChunkName: "detail" */"@/views/Blog/Detail")
    ),
    meta: {
      title: "文章详情",
    }
  },
  {
    name: "Project",
    // path: "/project",
    path: `${process.env.BASE_URL}project`,
    // component: () => import(/* webpackChunkName: "project" */"@/views/Project"),
    component: getPageComponent(() =>
      import(/* webpackChunkName: "project" */"@/views/Project")
    ),
    meta: {
      title: "项目&效果",
    }
  },
  {
    name: "Message",
    // path: "/message",
    path: `${process.env.BASE_URL}message`,
    // component: () => import(/* webpackChunkName: "message" */"@/views/Message"),
    component: getPageComponent(() =>
      import(/* webpackChunkName: "message" */"@/views/Message")
    ),
    meta: {
      title: "留言板",
    }
  },
  {
    name: "NotFound",
    path: "*", // 前面都没有匹配则一定被它匹配
    component: NotFound,
  }
]
