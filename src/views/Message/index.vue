<template>
  <div class="message-container" ref="messageContainer">
    <MessageArea
      title="留言板"
      :subTitle="`(${data.total})`"
      :list="data.rows"
      :isListLoading="isLoading"
      @submit="handleSubmit"
    />
  </div>
</template>

<script>
import MessageArea from "@/components/MessageArea";
import fetchData from "@/mixins/fetchData.js";
// 不在数据仓库中（数据量大、不是共享数据，不适合放入仓库），通过fetchData获取
import * as msgApi from "@/api/message";
import mainScroll from "@/mixins/mainScroll.js";
export default {
  components: {
    MessageArea,
  },
  mixins: [
    fetchData({ total: 0, rows: [] }),
    mainScroll("messageContainer", "smooth"),
  ],
  data() {
    return {
      page: 1,
      limit: 10,
    };
  },
  created() {
    this.$bus.$on("mainScroll", this.handleScroll);
  },
  destroyed() {
    this.$bus.$off("mainScroll", this.handleScroll);
  },
  computed: {
    // 还有更多
    hasMore() {
      return this.data.rows.length < this.data.total;
    }
  },
  methods: {
    async fetchData() {
      return await msgApi.getMessages(this.page, this.limit);
    },
    async handleSubmit(data, callback) {
      const resp = await msgApi.postMessage(data);
      callback("感谢您的留言");
      this.data.rows.unshift(resp);
      // 将最新留言添加到留言板最上面
      this.data.total++; // 模拟评论总数加一
    },
    handleScroll(dom) {
      if (this.isLoading || !dom) {
        return;
      }
      const range = 100;
      const dec = Math.abs(dom.scrollHeight - (dom.scrollTop + dom.clientHeight));
      if (dec <= range) {
        this.fetchMore();
      }
    },
    // 加载更多
    async fetchMore() {
      if (!this.hasMore) {
        return;
      }
      this.isLoading = true;
      this.page++;
      const resp = await this.fetchData();
      // this.data.total = resp.total;
      this.data.rows = this.data.rows.concat(resp.rows);
      this.isLoading = false;
    }
  },
};
</script>

<style scoped lang="less">
.message-container {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  padding: 25px 0;
  box-sizing: border-box;
}
.message-area-container {
  width: 700px;
  margin: 0 auto;
}
</style>