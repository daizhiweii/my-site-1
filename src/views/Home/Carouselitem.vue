<template>
  <!-- 单张轮播图 -->
  <div
    class="carousel-item-container"
    ref="container"
    @mousemove="handleMouseMove"
    @mouseleave="handleMouseLeave"
  >
  <!-- mousemove鼠标移动事件 -->
    <div class="carousel-img" :style="imagePosition" ref="image">
      <ImageLoader
        @load="this.showWords"
        :src="carousel.bigImg"
        :placeholder="carousel.midImg"
      />
    </div>
    <div class="title" ref="title">{{ carousel.title }}</div>
    <div class="desc" ref="desc">{{ carousel.description }}</div>
    <!-- 测试代码 -->
    <!-- <div class="test">横坐标：{{mouseX}}，纵坐标{{mouseY}}</div> -->
  </div>
</template>

<script>
import ImageLoader from "@/components/ImageLoader";
export default {
  props: ["carousel"],
  // 每张轮播图的信息（此组件只在首页使用，不通用，故属性不做约束）
  components: {
    ImageLoader,
  },
  data() {
    return {
      titleWidth: 0,
      descWidth: 0,
      containerSize: null, // 外层容器的尺寸
      innerSize: null, // 里层图片的尺寸
      mouseX: 0, // 鼠标的横坐标（相对于容器）
      mouseY: 0, // 鼠标的纵坐标
    };
  },
  computed: {
    // 得到图片坐标
    imagePosition() {
      if (!this.innerSize || !this.containerSize) {
      // 如果有一个或都没有值 
        return;
      }
      const extraWidth = this.innerSize.width - this.containerSize.width;
      const extraHeight = this.innerSize.height - this.containerSize.height;
      const left = -extraWidth / this.containerSize.width * this.mouseX;
      const top = -extraHeight / this.containerSize.height * this.mouseY;
      return {
        // left: left + "px",
        // top: top + "px",
        // 改变left和top值会引发reflow，考虑效率问题故用transform，
        // 将left和top固定为0
        transform: `translate(${left}px, ${top}px)`
      };
    },
    // 图片中间坐标
    center() {
      return {
        x: this.containerSize.width / 2,
        y: this.containerSize.height / 2,
      }
    }
  },
  mounted() {
    this.titleWidth = this.$refs.title.clientWidth;
    this.descWidth = this.$refs.desc.clientWidth;
    this.setSize();
    this.mouseX = this.center.x;
    this.mouseY = this.center.y;
    window.addEventListener("resize", this.setSize);
  },
  destroyed() {
    window.removeEventListener("resize", this.setSize);
  },
  methods: {
    // 调用该方法，显示文字
    showWords() {
      this.$refs.title.style.opacity = 1;
      this.$refs.title.style.width = 0;
      // 浏览器的渲染是异步的，代码运行完再渲染，故会覆盖，没有动画效果，
      // 故强制让浏览器渲染一次
      this.$refs.title.clientWidth; // reflow
      this.$refs.title.style.transition = "1s";
      this.$refs.title.style.width = this.titleWidth + "px";

      // 描述也是一样
      this.$refs.desc.style.opacity = 1;
      this.$refs.desc.style.width = 0;
      this.$refs.desc.clientWidth; // reflow
      this.$refs.desc.style.transition = "2s 1s"; // 延迟一秒
      this.$refs.desc.style.width = this.descWidth + "px";
    },
    // 获得容器与图片尺寸
    setSize() {
      this.containerSize = {
        width: this.$refs.container.clientWidth,
        height: this.$refs.container.clientHeight,
      };
      this.innerSize = {
        width: this.$refs.image.clientWidth,
        height: this.$refs.image.clientHeight,
      };
    },
    // 鼠标移动重新设置鼠标位置
    handleMouseMove(e) {
      const rect = this.$refs.container.getBoundingClientRect();
      this.mouseX = e.clientX - rect.left;
      this.mouseY = e.clientY - rect.top;
      // e.clientX为鼠标相对于视口的横坐标，
      // rect.left或rect.x为容器左上角相对于视口的横坐标，
      // mouseX即为鼠标相对于容器左上角的横坐标
    },
    // 鼠标移出时将鼠标位置再设为中间
    handleMouseLeave() {
      this.mouseX = this.center.x;
      this.mouseY = this.center.y;
    }
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/var.less";
// @import "~@/styles/mixin.less";
.carousel-item-container {
  // background: @dark;
  width: 100%;
  height: 100%;
  color: #fff;
  position: relative;
  overflow: hidden;
}
.carousel-img {
  width: 110%;
  height: 110%;
  position: absolute;
  // z-index: -1; 测试代码
  transition: 0.3s;
  // 图片初始状态在中间，防止第一次鼠标移入图片位置突然改变
  left: 0;
  top: 0;
}
// 测试代码
// .test {
//   position: absolute;
//   left: 0;
//   top: 0;
//   font-size: 1.2em;
//   color: #fff;
// }
.title,
.desc {
  position: absolute;
  left: 30px;
  color: #fff;
  letter-spacing: 3px;
  // 文字间距
  text-shadow: 1px 0 0 rgba(0, 0, 0, 0.5),
    // 横向向右1px 纵向0 扩散0
    -1px 0 0 rgba(0, 0, 0, 0.5),
    0 1px 0 rgba(0, 0, 0, 0.5), 0 -1px 0 rgba(0, 0, 0, 0.5);
  // 四个方向都描边，形成轮廓
  white-space: nowrap;
  overflow: hidden;
  opacity: 0;
  // width设为auto时，从0变为auto不触发动画效果，故要另做处理
}
.title {
  top: calc(50% - 40px);
  font-size: 2em;
}
.desc {
  top: calc(50% + 20px);
  font-size: 1.2em;
  color: lighten(@gray, 20%);
}
</style>