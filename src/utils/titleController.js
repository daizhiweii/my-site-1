// 控制网站标题（路由标题-个人空间标题）
// 在博客详情页需要将路由标题替换为博客标题 

let routeTitle = "", siteTitle = "";

// function setTitle() {
//   if (!routeTitle && !siteTitle) { 
//     document.title = "loading...";
//   } else if (routeTitle && !siteTitle) {
//     document.title = routeTitle;
//   } else if (!routeTitle && siteTitle) {
//     document.title = sietTitle;
//   } else {
//     document.title = `${routeTitle}-${siteTitle}`;
//   }
// }

function setTitle() {
  if (!routeTitle || !siteTitle) { // 至少有一个没有值
    document.title = "loading...";
  } else { // 都有值
    document.title = `${routeTitle}-${siteTitle}`;
  }
}

export default {
  // 设置路由标题
  setRouteTitle(title) {
    routeTitle = title;
    setTitle();
  },
  // 设置个人空间标题
  setSiteTitle(title) {
    siteTitle = title;
    setTitle();
  }
}