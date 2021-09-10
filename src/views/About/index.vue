<template>
  <div class="about-container" v-loading="loading || !srcLoaded">
  <!-- 希望loading等iframe网页加载完后再变为false，而不再是拿到响应数据就变为false -->
    <iframe
      v-if="src"
      class="about-content"
      :src="src"
      frameborder="0"
      @load="srcLoaded = true"
    ></iframe>
    <!-- 
      iframe 元素会创建包含另外一个文档的内联框架（即行内框架）
      src加载完成会触发load事件
    -->
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      srcLoaded: false, // iframe网页是否加载完成
    };
  },
  computed: mapState("about", {
    src: "data",
    loading: "loading",
  }),
  created() {
    this.$store.dispatch("about/fetchAbout");
  },
};
</script>

<style scoped lang="less">
.about-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative; // v-loading需要
}
.about-content {
  width: 100%;
  height: 100%;
  display: block; // iframe默认是行盒
  box-sizing: border-box;
}
</style>