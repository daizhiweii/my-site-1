<template>
  <div class="site-aside-container">
    <template v-if="data"> 
    <!-- data有值才显示 -->
      <Avatar :url="data.avatar" :size="100" />
      <h1 class="title">{{ data.siteTitle }}</h1>
      <Menu />
      <Contact />
      <p class="footer">{{ data.icp }}</p>
    </template>
  </div>
</template>

<script>
import Avatar from "@/components/Avatar";
import Menu from "./Menu";
import Contact from "./Contact";
import { mapState } from "vuex";
export default {
  components: {
    Avatar,
    Menu,
    Contact,
  },
  computed: mapState("setting", ["data"]),
};
</script>

<style scoped lang="less">
@import "~@/styles/var.less";
.site-aside-container {
  width: 100%;
  height: 100%;
  background: @dark;
  padding: 20px 0;
  box-sizing: border-box;
  overflow-x: hidden;
  overflow-y: auto;
  // 内容横向超出hidden，纵向超出auto（滚动）
  .avatar-container {
    margin: 0 auto;
  }
  .contact-container {
    margin-top: -10px;
  }
  .title {
    font-size: 1.2em;
    color: #fff;
    text-align: center;
  }
  .footer {
    text-align: center;
    font-size: 12px;
  }
}
</style>