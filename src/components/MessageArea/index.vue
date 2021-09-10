<template>
  <div class="message-area-container">
    <!-- 消息区域，可用于博客评论区和留言板，跨页面使用，具有通用性，故单独做为一个组件 -->
    <DataForm v-on="$listeners" />
    <!-- 
      本组件MessageArea也处理不了由DataForm组件抛出的submit提交表单事件，
      因为不知道提交的是博客评论还是留言板，因此仍需要抛给父组件处理。
      @submit="handleSubmit"
      等效于v-on:submit="handleSubmit"
      等效于v-on="{submit: handleSubmit}"
      说明v-on可以一次性处理多个事件处理函数。
      由于仍需原封不动抛给父组件处理，
      因此此处可以使用v-on="$listeners"接收父组件传过来的事件处理函数，
      此时本组件则不需要注册handleSubmit方法。
      注：
      `$listeners`是`vue`的一个实例（vue实例和组件实例）属性，
      它用于获取父组件传过来的所有事件函数。
      例：
      父组件 <Child @event1="handleEvent1" @event2="handleEvent2" />
      子组件 this.$listeners // { event1: handleEvent1, event2: handleEvent2 }
     -->
    <h3>
      {{ title }}
      <span>{{ subTitle }}</span>
    </h3>
    <DataList :list="list" />
    <div class="loading" v-loading="isListLoading"></div>
  </div>
</template>

<script>
import DataForm from "./DataForm";
import DataList from "./DataList";
export default {
  components: {
    DataForm,
    DataList,
  },
  props: {
    title: { // 如 留言板
      type: String,
      default: "",
    },
    subTitle: { // 如 （75）
      type: String,
      default: "",
    },
    list: { // 当前页列表数据，如 留言列表数据
      type: Array,
      default: () => [],
      // default为[]或{}时要用函数的返回结果来表示
    },
    isListLoading: { // 数据是否正在加载中
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped lang="less">
.loading {
  position: relative;
  height: 100px;
}
</style>