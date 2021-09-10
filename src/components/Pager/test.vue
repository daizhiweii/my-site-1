<template>
<!-- 启动此测试文件需运行 vue serve ./src/components/Pager/test.vue 命令-->
  <div>
    <Pager 
      :total="total" 
      :current="current" 
      @pageChange="handlePageChange" 
    />
    <!-- handlePageChange($event)此时的$event即抛出的事件参数 -->
  </div>
</template>

<script>
import Pager from "./";
// ./默认去找当前目录下的index.vue
export default {
  components: {
    Pager,
  },
  data() {
    return {
      total: 333,
      current: 8,
    }
  },
  methods: {
    handlePageChange(newPage) {
      this.current = newPage;
      console.log("加载当前页数据");
    }
  }
}
</script>

<style scoped>

</style>

