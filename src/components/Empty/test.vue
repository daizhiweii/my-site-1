<template>
  <div class="test-container">
    <Empty text="无数据" />
  </div>
</template>

<script>
import Empty from "./";
export default {
  components: {
    Empty,
  },
};
</script>

<style scoped>
.test-container {
  position: relative;
  margin: 0 auto;
  width: 500px;
  height: 500px;
  border: 1px solid #000;
}
</style>