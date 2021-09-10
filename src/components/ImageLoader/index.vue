<template>
  <div class="image-loader-container">
    <img v-if="!everythingDone" class="placeholder" :src="placeholder" />
    <!-- 当原图加载完毕且完全显示时，使占位图消失，因显示状态不会再变化，故用v-if -->
    <img
      @load="handleLoad"
      :src="src"
      :style="{
        opacity: originOpacity,
        transition: `${duration}ms`,
      }"
    />
    <!-- 此处的load事件为img标签自带的事件，img加载完成后触发 -->
  </div>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      default: 500,
    },
  },
  data() {
    return {
      originLoaded: false, // 原图是否加载完成
      everythingDone: false, // 是否一切都完成了
    };
  },
  computed: {
    originOpacity() {
      return this.originLoaded ? 1 : 0;
    },
  },
  methods: {
    // 处理原图加载完成
    handleLoad() {
      this.originLoaded = true;
      setTimeout(() => {
        this.everythingDone = true;
        this.$emit("load");
        // 向父组件提交事件，事件名称为load，无事件参数
      }, this.duration)
    },
  },
};
</script>

<style scoped lang="less">
@import "~@/styles/mixin.less";
.image-loader-container {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  img {
    .self-fill();
    object-fit: cover;
  }
  .placeholder {
    filter: blur(2vw);
  }
}
</style>