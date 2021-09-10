<template>
  <div
    class="home-container"
    ref="container"
    @wheel="handleWheel"
    v-loading="loading"
  >
    <!-- wheel用来处理鼠标滚轮滚动事件 -->
    <ul
      class="carousel-container"
      :style="{
        marginTop,
      }"
      @transitionend="handleTransitionEnd"
    >
      <li v-for="item in data" :key="item.id">
        <CarouselItem :carousel="item" />
      </li>
    </ul>
    <div v-show="index >= 1" @click="switchTo(index - 1)" class="icon icon-up">
      <Icon type="arrowUp" />
    </div>
    <div
      v-show="index < data.length - 1"
      @click="switchTo(index + 1)"
      class="icon icon-down"
    >
      <Icon type="arrowDown" />
    </div>
    <ul class="indicator">
      <li
        :class="{
          active: i === index,
        }"
        v-for="(item, i) in data"
        :key="item.id"
        @click="switchTo(i)"
      ></li>
    </ul>
    <!-- <Loading v-if="isLoading" /> -->
  </div>
</template>

<script>
// import { getBanners } from "@/api/banner";
import CarouselItem from "./Carouselitem.vue";
import Icon from "@/components/Icon";
// import Loading from "@/components/Loading";
// import fetchData from "@/mixins/fetchData.js"; 数据在仓库中不需要用了
import {mapState} from "vuex";

export default {
  // mixins: [fetchData([])], // 组件混入
  components: {
    CarouselItem,
    Icon,
    // Loading,
  },
  data() {
    return {
      // isLoading: true, // 是否正在获取远程数据，获取后变为false
      // banners: [], // 远程获取的数据
      index: 0, // 图片索引，表示当前显示的是第几张轮播图
      containerHeight: 0, // 整个容器的高度
      switching: false, // 是否正在换页中
    };
  },
  // created() {
  //   getBanners().then(r => this.banners = r);
  // },
  // 同
  // async created() {
  //   this.banners = await getBanners();
  //   this.isLoading = false;
  // },
  // created发生在注入之后，可以使用banners
  // 不能 async data() {} 是因为不能让其返回一个promise函数，
  // 钩子函数可以，因为返回什么无所谓
  created() {
    this.$store.dispatch("banner/fetchBanner");
  },
  mounted() {
    this.containerHeight = this.$refs.container.clientHeight;
    // ref附着在dom元素上，必须等dom元素渲染出来才能获取到，故用mounted
    window.addEventListener("resize", this.handleResize);
    // 监听resize事件，窗口尺寸改变时执行handleResize方法为containerHeight重新赋值
  },
  destroyed() {
    window.removeEventListener("resize", this.handleResize);
    // 当组件销毁时移除监听
  },
  computed: {
    marginTop() {
      return -this.index * this.containerHeight + "px";
    },
    ...mapState("banner", ["loading", "data"]),
  },
  methods: {
    // 获取远程数据（混入的组件fetchData([])需要当前组件提供的获取数据的方法）
    // async fetchData() {
    //   return await getBanners();
    // },
    // 切换轮播图
    switchTo(i) {
      this.index = i;
    },
    // 处理滚轮翻页
    handleWheel(e) {
      if (this.switching) {
        return;
      }
      if (e.deltaY < -5 && this.index > 0) {
        // 向上滚动
        this.switching = true;
        this.index--;
      } else if (e.deltaY > 5 && this.index < this.data.length - 1) {
        // 向下滚动
        this.switching = true;
        this.index++;
      }
    },
    handleTransitionEnd() {
      this.switching = false;
    },
    handleResize() {
      this.containerHeight = this.$refs.container.clientHeight;
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/mixin.less";
@import "~@/styles/var.less";
.home-container {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  // 触发bfc，避免ul与其产生margin合并
  // bfc触发条件：
  // 1.float的值不为none
  // 2.overflow的值不为visible
  // 3.display的值为table-cell、tabble-caption和inline-block之一
  // 4.position的值不为static或则releative中的任何一个

  // 测试样式
  // width: 60%;
  // height: 60%;
  // overflow: visible;
  // border: 2px solid #008c8c;
  // margin: 100px auto;

  ul {
    margin: 0;
    // 取消默认样式，ul有默认margin，设置为0也可避免margin合并
    list-style: none;
    padding: 0;
  }
}
.carousel-container {
  width: 100%;
  height: 100%;
  transition: 500ms;
  li {
    width: 100%;
    height: 100%;
  }
}
.icon {
  .self-center();
  transform: translateX(-50%);
  // 不需要纵向居中
  @gap: 25px;
  font-size: 30px;
  color: @gray;
  cursor: pointer;
  &.icon-up {
    top: @gap;
    animation: jump-up 2s infinite;
  }
  &.icon-down {
    bottom: @gap;
    top: auto;
    // .self-center()设置了top值，top和bottom值同时设置会报错，故加top: auto
    animation: jump-down 2s infinite;
  }
  @jump: 5px;
  @keyframes jump-up {
    0% {
      transform: translate(-50%, @jump);
    }
    50% {
      transform: translate(-50%, -@jump);
    }
    100% {
      transform: translate(-50%, @jump);
    }
  }
  @keyframes jump-down {
    0% {
      transform: translate(-50%, -@jump);
    }
    50% {
      transform: translate(-50%, @jump);
    }
    100% {
      transform: translate(-50%, -@jump);
    }
  }
}
.indicator {
  .self-center();
  transform: translateY(-50%);
  left: auto;
  // 设置auto的原因同上
  right: 20px;
  li {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: @words;
    cursor: pointer;
    margin-bottom: 10px;
    border: 1px solid #fff;
    box-sizing: border-box;
    &.active {
      background: #fff;
    }
  }
}
</style>