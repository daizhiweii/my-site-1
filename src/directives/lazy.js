// 图片懒加载

import eventBus from "@/eventBus"; // 导入事件总线
import { debounce } from "@/utils"; // 导入函数防抖
import defaultGif from "@/assets/default.gif";
// 导入默认图片。使用动态（相对）路径打包后路径会变化，所以不能直接书写路径，导入使用打包时会处理

let imgs = []; // 需要处理的图片数组

function setImage(img) {
  img.dom.src = defaultGif; // 先暂时使用默认图片
  // 处理图片
  const clientHeight = document.documentElement.clientHeight; // 视口高度
  const rect = img.dom.getBoundingClientRect();
  const height = rect.height || 150;
  // 该图片在视口范围内
  if (rect.top >= -height && rect.top < clientHeight) { 
    const tempImg = new Image();
    // 当真实图片加载完成之后
    tempImg.onload = function () {
      img.dom.src = img.src; // 读缓存
    }
    // 真实图片，不写到onload上面是因为避免太快加载完成导致onload监控不到，因此先注册事件
    tempImg.src = img.src; 
    // 已处理（真实图片正在或已经加载出来）后将这一项从数组中移除，
    // 滚动条再滚动时就不会再对其进行处理
    imgs = imgs.filter(i => i !== img);
  }
}

// 调用该函数，设置合适的图片
function setImages() {
  for (const img of imgs) {
    // 处理该图片
    setImage(img);
  }
}

function handleScroll() {
  setImages();
}

eventBus.$on("mainScroll", debounce(handleScroll, 50));

export default {
  inserted(el, binding) { // 被绑定元素插入父节点时调用
    const img = {
      dom: el, // 指令所绑定的元素
      src: binding.value, // 指令的绑定值
    };
    imgs.push(img);
    // 立即处理一次
    setImage(img);
  },
  unbind(el) { // 只调用一次，指令与元素解绑时调用
    imgs = imgs.filter(img => img.dom !== el);
    // 直接赋值为空数组应该也可以
    // imgs = [];
  }
}