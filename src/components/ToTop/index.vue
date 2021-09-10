<template>
  <!-- 回到顶部 -->
  <div
    class="to-top-container"
    @click="handleClick"
    :class="{ animated: click }"
    v-show="show"
  >
    Top
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false, // 默认不出现
      click: false,
    };
  },
  created() {
    // 事件总线——监听事件
    this.$bus.$on("mainScroll", this.handleScroll);
  },
  destroyed() {
    // 事件总线——取消监听事件
    this.$bus.$off("mainScroll", this.handleScroll);
  },
  methods: {
    handleClick() {
      this.click = true;
      setTimeout(()=>{
        this.click = false;
      }, 200)
      // 回到顶部
      this.$bus.$emit("setMainScroll", 0);
    },
    handleScroll(scrollDom) {
      if (!scrollDom) { // scrollDom不存在
        this.show = false;
        return;
      }
      // 滚动高度大于等于1000时显示
      this.show = scrollDom.scrollTop >= 1000 ? true : false;
    },
  },
};
</script>

<style scoped lang="less">
@import "~@/styles/var.less";
.to-top-container {
  background: @words;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  position: fixed;
  z-index: 999;
  right: 40px;
  bottom: 30px;
  text-align: center;
  line-height: 50px;
  cursor: pointer;
  color: #fff;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.7), 
  -5px 5px 10px rgba(0, 0, 0, 0.7),
  5px -5px 10px rgba(0, 0, 0, 0.7), 
  -5px -5px 10px rgba(0, 0, 0, 0.7);
  &.animated {
    animation: click 0.2s ease;
  }
}
@keyframes click {
  from {
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.7), 
    -5px 5px 10px rgba(0, 0, 0, 0.7),
    5px -5px 10px rgba(0, 0, 0, 0.7), 
    -5px -5px 10px rgba(0, 0, 0, 0.7);
  }
  50% {
    box-shadow: 1px 1px 7px rgba(0, 0, 0, 0.7), 
    -1px 1px 7px rgba(0, 0, 0, 0.7),
    1px -1px 7px rgba(0, 0, 0, 0.7), 
    -1px -1px 7px rgba(0, 0, 0, 0.7); 
    transform: scale(0.9);
  }
  to {
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.7), 
    -5px 5px 10px rgba(0, 0, 0, 0.7),
    5px -5px 10px rgba(0, 0, 0, 0.7), 
    -5px -5px 10px rgba(0, 0, 0, 0.7);
  }
}
</style>