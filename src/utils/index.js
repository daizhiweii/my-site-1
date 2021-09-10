// 将所有工具函数导出

export { default as showMessage } from "./showMessage";
// 将./showMessage.js默认导出的东西导出，名为showMessage;
// 相当于
// import showMessage from "./showMessage";
// export {showMessage};

export { default as getComponentRootDom } from "./getComponentRootDom";

export { default as formatDate } from "./formatDate";

export { default as debounce } from "./debounce";

export { default as titleController } from "./titleController";