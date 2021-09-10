/**
 * 处理主滚动条滚动
 * @param {String} refValue 滚动条所在的dom
 * @param {String} scrollBehavior 滚动条滚动方式，默认值为smooth
 * @returns 
 */
export default function(refValue, scrollBehavior = "smooth") {
  return {
    mounted() {
      // 事件总线——监听事件
      this.$bus.$on("setMainScroll", this.handleSetMainScroll);
      this.$refs[refValue].addEventListener("scroll", this.handleMainScroll);
    },
    beforeDestroy() { 
      this.$bus.$emit("mainScroll"); // 销毁原组件时通知监听"mainScroll"事件的其他组件
      this.$refs[refValue].removeEventListener("scroll", this.handleMainScroll);
      this.$bus.$off("setMainScroll", this.handleSetMainScroll);
    },
    methods: {
      // 混合需要避免与原组件的方法重名，如果重名会优先使用原组件的方法，vue3会解决这个问题
      handleMainScroll() {
        // 事件总线——触发事件
        this.$bus.$emit("mainScroll", this.$refs[refValue]);
      },
      handleSetMainScroll(scrollTop) {
        const OriginalScrollBehavior = this.$refs[refValue].style["scroll-behavior"];
        this.$refs[refValue].style["scroll-behavior"] = scrollBehavior;
        this.$refs[refValue].scrollTop = scrollTop;
        this.$refs[refValue].clientWidth;
        this.$refs[refValue].style["scroll-behavior"] = OriginalScrollBehavior;
      },
    },
  }
}