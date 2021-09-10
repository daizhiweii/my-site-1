<template>
  <div class="blog-toc-container">
    <!-- 单篇博客目录 -->
    <h2>目录</h2>
    <RightList :list="tocWithSelect" @select="handleSelect" />
  </div>
</template>

<script>
import RightList from "./RightList";
import { debounce } from "@/utils";
export default {
  components: {
    RightList,
  },
  props: {
    toc: {
      type: Array,
    },
  },
  data() {
    return {
      // 控制目录选中状态
      activeAnchor: "",
    };
  },
  computed: {
    // 根据toc属性以及activeAnchor得到带有isSelect属性的toc数组
    tocWithSelect() {
      // return this.toc.map((item) => ({
      //   ...item,
      //   isSelect: item.anchor === this.activeAnchor,
      // }));
      // 目录层级只有一层可以直接这样写，但此处是多层级目录，需要用到递归
      const getTOC = (toc = []) => {
        return toc.map((item) => ({
          ...item,
          isSelect: item.anchor === this.activeAnchor,
          children: getTOC(item.children),
          // 子目录需要做同样的处理
        }));
      };
      return getTOC(this.toc);
    },
    // 根据toc得到它们对应的元素数组，用于设置正确的activeAnchor
    doms() {
      const doms = [];
      const addToDoms = (toc) => {
        for (const item of toc) {
          doms.push(document.getElementById(item.anchor));
          // 如果item有children属性且属性长度大于0（递归）
          if (item.children && item.children.length) {
            addToDoms(item.children);
          }
        }
      };
      addToDoms(this.toc);
      return doms;
    },
  },
  created() {
    // 防抖
    this.DBsetSelect = debounce(this.setSelect, 50);
    // 事件总线——监听事件
    this.$bus.$on("mainScroll", this.DBsetSelect);
  },
  destroyed() {
    // 事件总线——取消监听事件
    this.$bus.$off("mainScroll", this.DBsetSelect);
  },
  methods: {
    handleSelect(item) {
      location.hash = item.anchor;
    },
    // 设置正确的activeAnchor
    setSelect(scrollDom) {
      if (!scrollDom) {
        return; // 如果scrollDom元素不存在则直接返回
      }
      console.log("setSelect");
      this.activeAnchor = ""; // 由于后续要重新设置，先清空之前的状态
      const range = 200;
      // 判断当前标题dom元素是否应该被选中
      for (const dom of this.doms) {
        if (!dom) {
          continue;
        }
        // 得到元素离视口顶部的距离
        const top = dom.getBoundingClientRect().top;
        if (top >= 0 && top <= range) {
          // 在规定的范围内
          this.activeAnchor = dom.id;
          return;
        } else if (top > range) {
          // 在规定的范围下方
          return;
        } else {
          // 在规定的范围上方
          this.activeAnchor = dom.id;
          // 先假设自己是激活的，然后继续看后面
        }
      }
    },
  },
};
</script>

<style scoped lang="less">
// 基本同BlogCategory
.blog-toc-container {
  h2 {
    font-weight: bold;
    letter-spacing: 2px;
    font-size: 1em;
    margin: 0;
  }
}
</style>