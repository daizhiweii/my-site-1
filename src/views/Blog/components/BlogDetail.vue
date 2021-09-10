<template>
  <div class="blog-detail-container">
    <h1>{{ blog.title }}</h1>
    <div class="aside">
      <!-- aside含义为附加信息 -->
      <span>日期：{{ formatDate(blog.createDate) }}</span>
      <span>浏览：{{ blog.scanNumber }}</span>
      <a href="#data-form-container">评论：{{ blog.commentNumber }}</a>
      <RouterLink
        :to="{
          name: 'CategoryBlog',
          params: {
            categoryId: blog.category.id,
          },
        }"
      >
        {{ blog.category.name }}
      </RouterLink>
    </div>
    <div v-html="blog.htmlContent" class="markdown-body"></div>
    <!-- 
      v-html="blog.htmlContent"相当于把div.innerHTML设置为blog.htmlContent，
      此时div里面再写东西就没用了
     -->
  </div>
</template>

<script>
import { formatDate } from "@/utils";
import "@/styles/markdown.css";
// markdown中的脚本部分着色需要安装第三方库highlight.js
import "highlight.js/styles/github.css";
export default {
  props: {
    blog: {
      type: Object,
      required: true,
    },
  },
  methods: {
    formatDate,
  },
};
</script>

<style scoped lang="less">
@import "~@/styles/var.less";
.aside {
  font-size: 12px;
  color: @gray;
  span,
  a {
    margin-left: 15px;
  }
}
.markdown-body {
  margin: 2em 0;
}
</style>