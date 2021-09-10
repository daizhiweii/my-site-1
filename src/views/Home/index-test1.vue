<template>
  <div class="home-container" ref="container">
  <!-- 通过ref获取容器的dom元素 -->
    <h1>首页</h1>
    <button @click="handleClick">Click</button>
  </div>
</template>

<script>
export default {
  methods: {
    handleClick() {
      this.$showMessage({
        content: "评论成功",
        type: "success",
        duration: 1000,
        container: this.$refs.container,
        callback: function () {
          console.log("完成！");
        }
      });
      // 使用Vue原型上的方法，组件实例this同Vue实例，this.__proto__最终也指向Vue.prototype
    },
  },
};
</script>

<style scoped lang="less">
.home-container {
  background: lightblue;
  width: 300px;
  height: 500px;
  border: 1px solid;
  margin: 50px auto;
}
</style>