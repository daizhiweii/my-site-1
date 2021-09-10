<template>
  <div class="home-container" id="test" ref="container">
    <h1>14.组件生命周期</h1>
    <h1 ref="title">{{count}}</h1>
    <button @click="count++">count+1</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      banners: [],
      count: 0,
    }
  },
  beforeCreate() {
  // 实例被创建后，注入之前
    console.log("beforeCreate", this.banners); // undefined
  },
  created() {
  // 注入之后，生成VNode之前
    console.log("created", this.banners); // []
  },
  beforeMount() {
  // 生成VNode之后，生成真实DOM之前
    console.log("beforeCreate", this.$refs.container); // 无
  },
  mounted() {
  // 生成真实DOM之后
    console.log("mounted", this.$refs.container); // div
  },
  beforeUpdate() {
  // 数据变动引发重新渲染之前
    console.log("beforeUpdate", this.$refs.title.innerText, this.count); 
    // 第一次点击：0 1（重新渲染之前的，数据已经更新）
  },
  updated() {
  // 数据变动引发重新渲染之后
    console.log("updated", this.$refs.title.innerText, this.count); 
    // 第一次点击：1 1
  },
  beforeDestroy() { 
  // 组件销毁之前
  // 如
  // v-if="false"会导致组件销毁
  // vue-router切换不同页面也会导致之前页面销毁
    console.log("beforeDestroy");
  },
  destroyed() {
  // 组件销毁之后
    console.log("destroyed");
  }
}
</script>

<style>

</style>