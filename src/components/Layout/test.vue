<template>
  <div class="test-container">
    <Layout>
      <template #left>
        <div class="left">左边栏区域，宽度适应内容，溢出隐藏</div>
      </template>
      <template #default>
        <div class="main">主区域，宽度占满剩余空间，溢出隐藏</div>
      </template>
      <template #right>
        <div class="right">右边栏区域，宽度适应内容，溢出隐藏</div>
      </template>
    </Layout>
  </div>
</template>

<script>
import Layout from "./";
export default {
  components: {
    Layout,
  },
};
</script>

<style scoped lang="less">
.test-container {
  width: 60%;
  height: 600px;
  border: 1px solid;
  margin: 0 auto;
  // white-space: nowrap;
  // 不允许换行
  .left {
    width: 200px;
    height: 100%;
    background: lightcoral;
  }
  .main {
    width: 100%;
    height: 100%;
    background: lightgreen;
  }
  .right {
    width: 150px;
    height: 100%;
    background: lightblue;
  }
}
</style>