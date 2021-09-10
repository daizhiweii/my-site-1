<template>
  <Layout>
    <BlogList />
    <template #right>
      <BlogCategory />
    </template>
  </Layout>
</template>

<script>
import Layout from "@/components/Layout";
import BlogList from "./components/BlogList";
import BlogCategory from "./components/BlogCategory";
export default {
  components: {
    Layout,
    BlogList,
    BlogCategory,
  },
  /*
  created() {
    console.log(this.$route);
    // $route是vue-router组件向vue原型上添加的方法，
    // this.$route会向上找到Vue.prototype.$route，
    // 用来获取路由信息，如
    // $route.params.categoryId
  }
  */
}
</script>

<style>

</style>