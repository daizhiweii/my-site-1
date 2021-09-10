<template>
  <div class="layout-container">
    <div class="left">
      <slot name="left"></slot>
    </div>
    <div class="main">
      <slot></slot>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang="less">
.layout-container {
  width: 100%;
  height: 100%;
  display: flex;
  .left,
  .right {
    flex: 0 0 auto;
    // 不能伸缩
    // flex:
    // flex-grow：定义项目的的放大比例，默认值为0；
    // flex-shrink：定义项目的缩小比例，默认值为1；
    // flex-basis： 定义在分配多余空间之前，项目占据的主轴空间（main size），浏览器根据此属性计算主轴是否有多余空间，默认值为auto
    overflow: hidden;
  }
  .main {
    flex: 1 1 auto;
    // 可以伸缩
    overflow: hidden;
  }
}
</style>