<template>
  <div class="test-container">
    <Contact />
  </div>
</template>

<script>
import Contact from "./";
import "@/styles/global.less";
export default {
  components: {
    Contact
  }
}
</script>

<style scoped>
.test-container {
  width: 500px;
  height: 500px;
  border: 1px solid #000;
  margin: 0 auto;
  background-color: gray;
  padding-top: 150px;
}
</style>