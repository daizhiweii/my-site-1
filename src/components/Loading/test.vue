<template>
  <div class="test-contaienr">
    <Loading v-if="isLoading" />
    <button @click="isLoading = !isLoading">切换显示/隐藏</button>
  </div>
</template>

<script>
import Loading from "./";
export default {
  components: {
    Loading,
  },
  data() {
    return {
      isLoading: true,
    }
  }
};
</script>

<style scoped lang="less">
.test-contaienr {
  position: relative;
  width: 500px;
  height: 500px;
  margin: 0 auto;
  border: 1px solid;
}
</style>