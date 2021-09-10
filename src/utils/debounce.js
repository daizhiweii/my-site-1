// 防抖
export default function (fn, duration = 100) {
  let timer = null;
  return (...arg) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...arg);
    }, duration);
  }
}