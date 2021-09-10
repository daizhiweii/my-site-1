<template>
  <!-- 只有总页数大于1时才显示，因为总页数不会频繁变化，故在v-if和v-show中选择使用v-if -->
  <div class="pager-container" v-if="pageNumber > 1">
    <a @click="handleClick(1)" :class="{disabled: current === 1}">|&lt;&lt;</a>
    <!-- handleClick和handleClick($event)都可传递事件参数，前者默认传递一个事件参数，后者可以传递额外的参数，handleClick()不会默认传递事件参数 -->
    <a @click="handleClick(current - 1)" :class="{disabled: current === 1}">&lt;&lt;</a>
    <a @click="handleClick(n)" v-for="(n, i) in numbers" :key="i" :class="{active: n === current}">{{n}}</a>
    <!-- 先运行v-for，故在同一行可以使用名词变量n -->
    <a @click="handleClick(current + 1)" :class="{disabled: current === pageNumber}">&gt;&gt;</a>
    <a @click="handleClick(pageNumber)" :class="{disabled: current === pageNumber}">&gt;&gt;|</a>
  </div>
</template>

<script>
export default {
  props: {
    // 当前页码
    current: {
      type: Number,
      default: 1,
    },
    // 总数据量
    total: {
      type: Number,
      default: 0,
    },
    // 页容量
    limit: {
      type: Number,
      default: 10,
    },
    // 可见页码数
    visibleNumber: {
      type: Number,
      default: 10
    }
  },
  computed: {
    // 总页数
    pageNumber() {
      return Math.ceil(this.total / this.limit);
    },
    // 得到要显示的最小页码数
    visibleMin() {
      let min = this.current - Math.floor(this.visibleNumber / 2);
      if (min < 1) {
        min = 1;
      }
      return min;
    },
    // 得到要显示的最大页码数
    visibleMax() {
      let max =  this.visibleMin + this.visibleNumber - 1;
      if (max > this.pageNumber) {
        max = this.pageNumber;
      }
      return max;
    },
    // 生成要显示的页码数组
    numbers() {
      let nums = [];
      for (let i = this.visibleMin; i <= this.visibleMax; i++) {
        nums.push(i);
      }
      return nums;
    }
  },
  methods: {
    handleClick(newPage) {
      if (newPage < 1) {
        newPage = 1;
      }
      if (newPage > this.pageNumber) {
        newPage = this.pageNumber;
      }
      if (newPage === this.current) {
        return;
      }
      // 在组件中抛出一个事件
      this.$emit("pageChange", newPage);
    }
  }
}
</script>

<style lang="less" scoped>
@import "~@/styles/var.less";
// 在样式sytle中 ~@ 代表src目录，脚本script中 @ 代表src目录
.pager-container {
  display: flex;
  justify-content: center;
  margin: 20px 0;
  a {
    color: @primary;
    margin: 0 6px;
    cursor: pointer;
    &.disabled {
      color: @lightWords;
      cursor: not-allowed;
    }
    &.active {
      color: @words;
      font-weight: bold;
      cursor: text;
    }
  }
}
</style>