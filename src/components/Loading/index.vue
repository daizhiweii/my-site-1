<template>
  <img class="loading-container" :src="loadingUrl" alt="">
  <!-- 静态（绝对）路径在npm run build打包之后会自动处理，变为最终路径；
  动态（相对）路径打包时分析template模板时分析不出来，不会变为最终路径 -->
</template>

<script>
import loadingUrl from "@/assets/loading.svg";
// 利用webpack中的file-loader直接导入静态资源
export default {
  data() {
    return {
      loadingUrl,
    }
  }
}
</script>

<style lang="less" scoped>
@import "~@/styles/mixin.less";
.loading-container {
  .self-center();
}
</style>