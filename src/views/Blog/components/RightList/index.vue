<template>
  <!-- 组件递归 -->
  <ul class="right-list-container">
    <li v-for="(item, i) in list" :key="i">
      <span @click="handleClick(item)" :class="{ active: item.isSelect }">
        {{ item.name }}
      </span>
      <span
        @click="handleClick(item)"
        v-if="item.aside"
        class="aside"
        :class="{ active: item.isSelect }"
      >
        {{ item.aside }}
      </span>
      <!-- 显示当前组件 -->
      <RightList :list="item.children" @select="handleClick" />
      <!-- 将select事件往上抛 -->
    </li>
  </ul>
</template>

<script>
export default {
  name: "RightList", // 组件名
  props: {
    // [ { name:"xxx", isSelect:true, children:[{name:"yyy", isSelect:false}] }, {} ]
    list: {
      type: Array,
      default: () => [],
      // 默认值是数组或对象要写成一个函数，函数的返回结果作为默认值
    },
  },
  methods: {
    handleClick(item) {
      // if (!item.isSelect) { // 当前不是select状态才触发
      //   this.$emit("select", item);
      // }
      this.$emit("select", item); // 是select状态也触发
    },
  },
};
</script>

<style scoped lang="less">
@import "~@/styles/var.less";
.right-list-container {
  list-style: none;
  padding: 0;
  .right-list-container {
    margin-left: 1em;
  }
  li {
    min-height: 40px;
    // 有些li不止40px
    line-height: 40px;
    font-size: 14px;
    cursor: pointer;
    .active {
      color: @warn;
      font-weight: bold;
    }
  }
}
.aside {
  font-size: 12px;
  margin-left: 1em;
  color: @gray;
}
</style>