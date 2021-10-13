<template>
  <i class="iconfont icon-container" :class="fontClass"></i>
</template>

<script>
const classMap = {
  home: "icon-zhuye",
  success: "icon-zhengque",
  error: "icon-cuowu",
  close: "icon-guanbi",
  warn: "icon-jinggao",
  info: "icon-xinxiinformation38",
  blog: "icon-blog",
  code: "icon-code",
  about: "icon-set_about_hov",
  weixin: "icon-weixin-copy",
  mail: "icon-Emailus",
  github: "icon-GitHub",
  qq: "icon-sign_qq",
  arrowUp: "icon-shangjiantou",
  arrowDown: "icon-xiajiantou",
  empty: "icon-empty",
  chat: "icon-liuyan",
};

// 具名导出
export const types = Object.keys(classMap);

export default {
  props: {
    type: {
      type: String,
      required: true,
    },
  },
  computed: {
    // 图标类样式
    fontClass() {
      return classMap[this.type];
    },
  },
}
</script>

<style scoped>
@import "//at.alicdn.com/t/font_2650494_1kkps3hy3lb.css";
.iconfont {
  color: inherit;
  font-size: inherit;
}
</style>