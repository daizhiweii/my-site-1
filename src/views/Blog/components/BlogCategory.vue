<template>
  <div class="blog-category-container" v-loading="isLoading">
    <h2>文章分类</h2>
    <RightList :list="list" @select="handleSelect" />
  </div>
</template>

<script>
import RightList from "./RightList";
import fetchData from "@/mixins/fetchData.js";
import { getBlogCategories } from "@/api/blog.js";
export default {
  mixins: [fetchData([])],
  components: {
    RightList,
  },
  computed: {
    categoryId() {
      return +this.$route.params.categoryId || -1;
    },
    limit() {
      return +this.$route.query.limit || 10;
    },
    list() {
      const totalArticleCount = this.data.reduce(
        (a, b) => a + b.articleCount,
        0
      );
      const result = [
        {
          name: "全部",
          id: -1,
          articleCount: totalArticleCount,
        },
        ...this.data,
      ];
      return result.map((item) => ({
        ...item,
        isSelect: item.id === this.categoryId,
        aside: `${item.articleCount}篇`,
      }));
    },
  },
  methods: {
    async fetchData() {
      return await getBlogCategories();
    },
    handleSelect(item) {
      const query = {
        page: 1, // 改变了分类，页码回到第一页
        limit: this.limit,
      };
      if (item.id === -1) {
        // 全部分类
        this.$router.push({
          name: "Blog",
          query,
        });
      } else {
        // 当前有分类
        this.$router.push({
          name: "CategoryBlog",
          params: {
            categoryId: item.id,
          },
          query,
        });
      }
    },
  },
};
</script>

<style scoped lang="less">
.blog-category-container {
  width: 250px;
  height: 100%;
  box-sizing: border-box;
  padding: 20px;
  position: relative;
  // 自定义指令v-loading需要容器为relative
  overflow-y: auto;
  h2 {
    font-weight: bold;
    letter-spacing: 2px;
    font-size: 1em;
    margin: 0;
    // h2有默认margin
  }
}
</style>