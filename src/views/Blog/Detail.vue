<template>
<!-- 博客详情页 -->
  <Layout>
    <div ref="mainContainer" class="main-container" v-loading="isLoading">
      <BlogDetail :blog="data" v-if="data" />
      <BlogComment v-if="!isLoading" />
      <!-- 当博客数据加载完成后再渲染该组件（先加载文章，后加载评论） -->
    </div>
    <template #right>
      <div class="right-container" v-loading="isLoading">
        <BlogTOC :toc="data.toc" v-if="data" />
      </div>
    </template>
  </Layout>
</template>

<script>
import fetchData from "@/mixins/fetchData";
import {getBlog} from "@/api/blog";
import Layout from "@/components/Layout";
import BlogDetail from "./components/BlogDetail";
import BlogTOC from "./components/BlogTOC";
import BlogComment from "./components/BlogComment";
import mainScroll from "@/mixins/mainScroll.js";
import {titleController} from "@/utils";
export default {
  mixins: [fetchData(), mainScroll("mainContainer", "smooth")],
  components: {
    Layout,
    BlogDetail,
    BlogTOC,
    BlogComment,
  },
  methods: {
    async fetchData() {
      const resp = await getBlog(this.$route.params.id);
      if (!resp) { // 文章不存在，跳转到NotFound页面
        // this.$router.push({name: "NotFound"});
        // 因为path为*，所以这样跳转后会出问题，因此：
        this.$router.push("/404");
        return;
      }
      if (resp.title) {
        titleController.setRouteTitle(resp.title);
      }
      return resp;
    },
  },
  // 问题：
  // 当页面刷新时，文章不会自动跳转到锚链接的位置
  // 原因：
  // 浏览器把dom元素（本页面为<div id="app"></div>）加载完成时开始跳转，
  // 此时页面啥都没有（<div id="app"></div>已加载但未获取到数据前的loading状态），
  // 当获取到数据时已经完成跳转，不会再次跳转
  // 解决：
  updated() {
    const hash = location.hash;
    location.hash = "";
    this.$refs.mainContainer.clientWidth;
    location.hash = hash;
  }
}
</script>

<style scoped lang="less">
.main-container {
  overflow-y: scroll;
  height: 100%;
  // 若为min-height: 100%;则会把高度撑开，没有滚动条
  width: 100%;
  overflow-x: auto;
  // overflow-x: hidden;
  box-sizing: border-box;
  padding: 20px;
  position: relative;
  scroll-behavior: smooth;
}
.right-container {
  width: 250px;
  height: 100%;
  position: relative;
  overflow-y: auto;
  box-sizing: border-box;
  padding: 20px;
}
</style>