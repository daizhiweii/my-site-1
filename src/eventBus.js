// 27.事件总线（跨组件通信）

/**
 * 事件名：mainScroll
 * 含义：主区域滚动条位置变化后触发
 * 参数：
 * - 滚动的dom元素，如果为undefined，则表示dom元素已经不存在
 * 
 * 事件名：setMainScroll
 * 含义：当需要设置主区域滚动条位置时触发
 * 参数：
 * - 滚动高度
 */
 import Vue from "vue";
 const app = new Vue({}); // vue实例
 Vue.prototype.$bus = app; // 设置到原型上，方便每个组件内部使用
 export default app; // 导出，为了某些js模块能够使用

/*
// 1.提供监听某个事件的接口
// 2.提供取消监听的接口
// 3.触发事件的接口（可传递数据）
// 4.触发事件后会自动通知监听者

const listeners = {};
// 记录需要监听的事件和相应的处理函数
// {
//   "event1": [handler1, handler2],
//   "event2": [handler1, handler2],
// }

// 导出的对象就是事件总线
export default {
  // 监听某一个事件
  $on(eventName, handler) {
    if (!listeners[eventName]) {
      listeners[eventName] = new Set(); // 避免重复
    }
    listeners[eventName].add(handler);
  },
  // 取消监听某一个事件
  $off(eventName, handler) {
    if (!listeners[eventName]) {
      return;
    }
    listeners[eventName].delete(handler);
  },
  // 触发某一个事件（第二个参数为触发事件需要传递的数据）
  $emit(eventName, ...args) {
    if (!listeners[eventName]) {
      return;
    }
    for (const handler of listeners[eventName]) {
      handler(...args);
    }
  },
}

// vue实例本质上跟组件实例差不多，
// 组件实例里面有$emit、$on、$off等实例成员，
// vue实例也有（在vue原型上）
*/





