<template>
  <div class="blog-comment-container">
    <MessageArea
      title="评论列表"
      :subTitle="`(${data.total})`"
      :list="data.rows"
      :isListLoading="isLoading"
      @submit="handleSubmit"
    />
    <!-- 博客评论组件可以处理子组件抛出的submit提交表单事件了，因为知道提交的是博客评论 -->
  </div>
</template>

<script>
import MessageArea from "@/components/MessageArea";
import fetchData from "@/mixins/fetchData.js";
import { getComments, postComment } from "@/api/blog.js";
export default {
  mixins: [fetchData({ total: 0, rows: [] })],
  // 未获取到数据时，总数total默认为0条，当前页评论rows默认为空数组
  components: {
    MessageArea,
  },
  data() {
    return {
      page: 1, // 评论页码
      limit: 10, // 页容量
    };
  },
  created() {
    // 事件总线——监听事件
    this.$bus.$on("mainScroll", this.handleScroll);
  },
  destroyed() {
    // 事件总线——取消监听事件
    this.$bus.$off("mainScroll", this.handleScroll);
  },
  computed: {
    // 是否还有更多数据
    hasMore() {
      return this.data.rows.length < this.data.total;
    }
  },
  methods: {
    // 处理滚动条滚动到了底部
    handleScroll(scrollDom) {
      if (this.isLoading || !scrollDom) { 
      // 目前正在加载更多评论或scrollDom已经不存在
        return;
      }
      const range = 100; // 定一个算到达了底部的范围
      const dec = Math.abs(scrollDom.scrollHeight - (scrollDom.scrollTop + scrollDom.clientHeight));
      // scrollHeight 滚动高度
      // scrollTop 滚动距离
      // clientHeight 可视高度
      if (dec <= range) {
        this.fetchMore();
      }
    },
    async fetchData() {
      return await getComments(this.$route.params.id, this.page, this.limit);
    },
    // 处理提交评论
    async handleSubmit(formData, callback) {
      const resp = await postComment({
        ...formData,
        blogId: this.$route.params.id,
      });
      // 获取提交评论后服务器返回的数据
      this.data.rows.unshift(resp);
      // 将响应结果（提交评论后返回的数据）加到博客评论数据数组的开头
      // 若被mock拦截，模拟数据的nickname、content等都是随机生成的，
      // 因此会与提交评论的用户昵称和内容不一样
      this.data.total++; // 模拟数据总数需要++
      callback("评论成功"); // 处理完成，调用子组件提供的callback函数
    },
    // 加载下一页
    async fetchMore() {
      if (!this.hasMore) {
        return;
      }
      this.isLoading = true;
      this.page++;
      const resp = await this.fetchData();
      this.data.total = resp.total;
      this.data.rows = this.data.rows.concat(resp.rows);
      // var arr1 = [1,2,3]
      // var arr2 = [4,5,6]
      // arr1.concat(arr2)为[1,2,3,4,5,6]
      this.isLoading = false;
    },
  },
};
</script>

<style scoped lang="less">
.blog-comment-container {
  margin: 30px 0;
}
</style>