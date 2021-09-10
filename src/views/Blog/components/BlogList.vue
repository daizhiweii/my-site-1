<template>
  <div class="blog-list-container" ref="mainContainer" v-loading="isLoading">
    <ul>
      <li v-for="item in data.rows" :key="item.id">
        <div class="thumb" v-if="item.thumb">
          <!-- thumb缩略图，有缩略图显示，没有不显示 -->
          <RouterLink :to="{ name: 'Detail', params: { id: item.id } }">
            <img v-lazy="item.thumb" :alt="item.title" :title="item.title" />
            <!-- 
              自定义全局指令v-lazy：
              先加载默认图片，等滑动到其位置再替换成真实图片，即图片懒加载
              alt是图片显示不出来时的占位文字，title是鼠标移上去的提示文字 
            -->
          </RouterLink>
        </div>
        <div class="main">
          <RouterLink :to="{ name: 'Detail', params: { id: item.id } }">
            <h2>{{ item.title }}</h2>
          </RouterLink>
          <div class="aside">
            <span>日期：{{ formatDate(item.createDate) }}</span>
            <span>浏览：{{ item.scanNumber }}</span>
            <span>评论：{{ item.commentNumber }}</span>
            <RouterLink
              :to="{
                name: 'CategoryBlog',
                params: {
                  categoryId: item.category.id,
                },
              }"
            >
              {{ item.category.name }}
            </RouterLink>
          </div>
          <div class="desc">{{ item.description }}</div>
        </div>
      </li>
    </ul>
    <!-- 加载完毕后无数据则渲染该组件 -->
    <Empty v-if="data.rows.length === 0 && !isLoading" />
    <!-- 分页放到这里 -->
    <Pager
      v-if="data.total"
      :current="routeInfo.page"
      :total="data.total"
      :limit="routeInfo.limit"
      :visibleNumber="10"
      @pageChange="handlePageChange"
    />
  </div>
</template>

<script>
import Pager from "@/components/Pager";
import fetchData from "@/mixins/fetchData.js";
// 远程获取数据，created时第一次调用，地址变化时也要调用
import { getBlogs } from "@/api/blog.js";
import { formatDate } from "@/utils";
import mainScroll from "@/mixins/mainScroll.js";
import Empty from "@/components/Empty"; // 没有数据则渲染该组件
export default {
  mixins: [
    fetchData({ total: 0, rows: [] }),
    mainScroll("mainContainer", "smooth"),
  ],
  components: {
    Pager,
    Empty,
  },
  computed: {
    // 获取路由信息
    routeInfo() {
      const categoryId = +this.$route.params.categoryId || -1;
      // 获取分类id，$route中的属性值都为字符串，+可以将字符串转换为数字，没有默认为-1全部分类
      const page = +this.$route.query.page || 1; // 第几页
      const limit = +this.$route.query.limit || 10; // 页容量
      return {
        categoryId,
        page,
        limit,
      };
    },
  },
  methods: {
    formatDate,
    async fetchData() {
      return await getBlogs(
        this.routeInfo.page,
        this.routeInfo.limit,
        this.routeInfo.categoryId
      );
    },
    handlePageChange(newPage) {
      // 跳转到第newPage页
      const query = {
        page: newPage,
        limit: this.routeInfo.limit,
      };
      if (this.routeInfo.categoryId === -1) {
        // 当前没有分类
        // $router用来在代码中跳转页面，$route用来获取路由信息
        // 命名路由跳转，this.$router.push("路由地址")为普通跳转
        this.$router.push({
          name: "Blog",
          query,
        });
      } else {
        // 当前有分类
        this.$router.push({
          name: "CategoryBlog",
          params: {
            categoryId: this.routeInfo.categoryId,
          },
          query,
        });
      }
    },
  },
  watch: {
    // 利用`watch`配置，可以直接观察某个数据的变化，变化时做出处理
    // 观察this.$route的变化，变化后会调用该函数
    // 每一次路由变化，this.$route都是一个新的对象，watch能够监控到，
    // this.$route里的属性发生变化，watch则监控不到
    async $route(newVal, oldVal) {
      // newVal：变化后的值（同this.$route），oldVal：变化前的值
      this.isLoading = true;
      this.$refs.mainContainer.scrollTop = 0; // 滚动高度设为0
      this.data = await this.fetchData();
      /*
      重新获取数据
      （bug：若被mock拦截，会重新获取模拟数据，总数据量会变化，从而导致总页数变化）
      因此可以将mock模拟的数据total设为固定值
      */
      this.isLoading = false;
    },
  },
};
</script>

<style scoped lang="less">
@import "~@/styles/var.less";
.blog-list-container {
  line-height: 1.7;
  position: relative;
  padding: 20px;
  overflow-y: scroll;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  // scroll-behavior: smooth;
  // 平滑滚动
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
}
li {
  display: flex;
  padding: 15px 0;
  border-bottom: 1px solid @gray;
  .thumb {
    flex: 0 0 auto;
    // 不放大不缩小
    margin-right: 15px;
    img {
      display: block;
      max-width: 200px;
      border-radius: 5px;
    }
  }
  .main {
    flex: 1 1 auto;
    // 放大且缩小，自适应布局
    h2 {
      margin: 0;
    }
  }
  .aside {
    font-size: 12px;
    color: @gray;
    span {
      margin-right: 15px;
    }
  }
  .desc {
    margin: 15px 0;
    font-size: 14px;
  }
}
</style>