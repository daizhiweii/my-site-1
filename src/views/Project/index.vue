<template>
  <!-- 
  &amp;  表示 &
  &nbsp; 表示 空格
  &lt;   表示 <
  &gt;   表示 >
  &copy; 表示 @ 
  -->
  <div class="project-container" ref="projectContainer" v-loading="loading">
    <a
      class="project-item"
      v-for="item in data"
      :key="item.id"
      :href="item.url ? item.url : `javascript:alert('该项目无法通过外网访问')`"
      :target="item.url ? '_blank' : '_self'"
    >
      <!-- 
      javascript:void(0)：啥都不做
      javascript:alert('该项目无法通过外网访问')：弹出提示
      _blank新窗口，_self当前窗口
     -->
      <img class="thumb" v-lazy="item.thumb" alt="" />
      <div class="info">
        <h2>{{ item.name }}</h2>
        <a
          class="github"
          :href="item.github"
          v-if="item.github"
          target="_blank"
        >
          github：{{ item.github }}
        </a>
        <p v-for="(desc, i) in item.descripition" :key="i">{{ desc }}</p>
      </div>
    </a>
    <Empty v-if="data.length === 0 && !loading" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import mainScroll from "@/mixins/mainScroll.js";
import Empty from "@/components/Empty";
export default {
  components: {
    Empty,
  },
  mixins: [mainScroll("projectContainer", "smooth")],
  computed: mapState("project", ["loading", "data"]),
  created() {
    this.$store.dispatch("project/fetchProject");
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/var.less";
.project-container {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 20px;
  position: relative;
  overflow-y: auto;
}
.project-item {
  transition: 0.5s;
  padding: 20px;
  display: flex;
  margin-bottom: 20px;
  &:hover {
    box-shadow: -1px 1px 5px #000;
    transform: scale(1.01) translate(3px, -3px);
    // 放大1.01倍
    color: inherit;
    // 使hover时文本颜色保持不变
  }
  .thumb {
    width: 250px;
    min-height: 150px;
    max-height: 200px;
    flex: 0 0 auto;
    object-fit: cover;
    border-radius: 5px;
    margin-right: 15px;
  }
  .info {
    line-height: 1.7;
    flex: 1 1 auto;
    h2 {
      margin: 0;
    }
    .github {
      font-size: 14px;
      color: @primary;
    }
  }
}
</style>