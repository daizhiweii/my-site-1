// 自定义指令

import loadingUrl from "@/assets/loading.svg";
import styles from "./loading.module.less";
// 得到el中loading效果的img元素
function getLoadingImage(el) {
  return el.querySelector("img[data-role='loading']");
}
// 创建loading效果的img元素
function createLoadingImg() {
  const img = document.createElement("img");
  img.dataset.role = "loading";
  // <img data-role="loading" />
  img.src = loadingUrl;
  img.className = styles.loading;
  return img;
}

// 导出指令的配置对象
/*
export default {
  // el是被绑定元素对应的真实DOM
  // binding是一个对象，描述了指令中提供的信息
  bind(el, binding) {
    console.log("bind", el, binding)
    // 只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置
    // 根据binding.value的值，决定创建或删除img元素，放到el元素内部
  },
  inserted(el, binding) {
    console.log("inserted", el, binding)
    // 被绑定元素插入父节点时调用
  },
  update(el, binding) {
    console.log("update", el, binding)
    // 所在组件的Vnode更新时调用
    // 根据binding.value的值，决定创建或删除img元素，放到el元素内部
  }
}
例：
<div v-mydirec:a.b.c="2 > 1"></div>
其中
bining: {
  name: "mydirec", // 指令名称
  value: true,     // 指令值
  arg: "a",        // 指令参数
  modifiers: {
    b: true,       // 具有指令修饰符
    c: true,       // 具有指令修饰符
  }
}
*/
// 当bind和update要实现的功能相同，可以直接把指令配置简化为一个单独的函数：
export default function (el, binding) {
  // 该函数会被同时设置到bind和update中
  // 根据binding.value的值，决定创建或删除img元素，放到el元素内部
  const curImg = getLoadingImage(el);
  if (binding.value) {
    if (!curImg) {
      const img = createLoadingImg();
      el.appendChild(img);
    }
  } else {
    if (curImg) {
      curImg.remove();
    }
  }
}


