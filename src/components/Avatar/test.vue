<template>
  <div>
    <Avatar url="https://img2.baidu.com/it/u=282675288,3241429691&fm=26&fmt=auto&gp=0.jpg" :size="100" />
  </div>
</template>

<script>
import Avatar from "./";
export default {
  components: {
    Avatar,
  },
};
</script>

<style>
  div {
    width: 100px;
    height: 100px;
    background-color: red;
  }
</style>