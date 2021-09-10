<template>
  <img
    class="avatar-container"
    :src="url"
    :style="{
      width: size + 'px',
      height: size + 'px',
    }"
  />
</template>

<script>
export default {
  props: {
    url: {
      type: String, // url属性必须是一个字符串
      required: true, // 属性必须传递
    },
    size: {
      type: Number,
      default: 100,
    },
  },
};
</script>

<style scoped>
/* scoped会给该组件的每一个元素和子组件的根元素加上一个特定属性，css也会添加属性选择器 */
.avatar-container {
  border-radius: 50%;
  object-fit: cover; 
  /* 保持图片宽高比例不变 */
  display: block;
  /* 变为块级元素，为了防止放入块盒中出现白边 */
}
</style>