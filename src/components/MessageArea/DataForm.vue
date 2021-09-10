<template>
  <form
    id="data-form-container"
    ref="form"
    class="data-form-container"
    @submit.prevent="handleSubmit"
  >
    <!-- 设置id是为了实现点击超链接跳转到此处 -->
    <!-- 
    在form表单内，
    在input单行文本框按enter键、点击button按钮都会触发form表单的submit提交事件，
    因为button的type值默认为submit，设置为type="button"则不再触发，
    form表单提交有默认行为，会根据action地址和method发送方法发送到服务器，并刷新页面，
    为了避免页面刷新，可以用submit的修饰符prevent阻止form表单提交的默认行为，用ajax提交
  -->
    <div class="form-item">
      <div class="input-area">
        <input
          type="text"
          maxlength="10"
          placeholder="用户昵称"
          v-model="formData.nickname"
        />
        <span class="tip">{{ formData.nickname.length }}/10</span>
      </div>
      <div class="error">{{ error.nickname }}</div>
    </div>
    <div class="form-item">
      <div class="text-area">
        <textarea
          maxlength="300"
          placeholder="输入内容"
          v-model="formData.content"
        ></textarea>
        <span class="tip">{{ formData.content.length }}/300</span>
      </div>
      <div class="error">{{ error.content }}</div>
    </div>
    <div class="form-item">
      <div class="button-area">
        <button :disabled="isSubmitting">
          {{ isSubmitting ? "提交中..." : "提交" }}
        </button>
      </div>
    </div>
  </form>
</template>

<script>
import { showMessage } from "@/utils";
// 凡是界面上有可能发生变化的动态数据，设置为props或者自己的data作为数据来源
export default {
  data() {
    return {
      formData: {
        nickname: "", // 用户昵称
        content: "", // 评论内容
      },
      error: {
        nickname: "", // 昵称的错误消息
        content: "", // 内容的错误消息
      },
      isSubmitting: false,
    };
  },
  methods: {
    handleSubmit() {
      this.error.nickname = this.formData.nickname ? "" : "请填写昵称";
      this.error.content = this.formData.content ? "" : "请填写评论内容";
      if (this.error.nickname || this.error.content) {
        // 有错误不提交
        return;
      }
      this.isSubmitting = true; // 正在提交，防止重复点击
      // 让父组件处理submit事件
      this.$emit("submit", this.formData, (successMsg) => {
        // this.isSubmitting = false;
        // this.formData.nickname = "";
        // this.formData.content = "";
        showMessage({
          content: successMsg,
          type: "success",
          duration: 1000,
          container: this.$refs.form,
          callback: () => {
            console.log(successMsg);
            this.isSubmitting = false;
            this.formData.nickname = "";
            this.formData.content = "";
          },
          // 消息提示框消失后会执行callback
        });
      });
    },
  },
};
</script>

<style scoped lang="less">
@import "~@/styles/var.less";
.data-form-container {
  margin-bottom: 20px;
  overflow: hidden;
}
.form-item {
  margin-bottom: 8px;
}
.input-area {
  width: 50%;
  position: relative;
}
.text-area {
  position: relative;
}
.tip {
  position: absolute;
  right: 5px;
  bottom: 5px;
  color: #b4b8bc;
  font-size: 12px;
}
input,
textarea {
  display: block;
  width: 100%;
  box-sizing: border-box;
  border: 1px dashed @gray;
  outline: none;
  // 去掉默认聚焦边框样式
  color: @words;
  font-size: 14px;
  border-radius: 4px;
  &:focus {
    border-color: @primary;
  }
}
input {
  padding: 0 15px;
  height: 40px;
}
textarea {
  resize: none;
  // 去掉textarea默认resize按钮
  padding: 8px 15px;
  height: 120px;
}
.error {
  margin-top: 6px;
  color: @danger;
  font-size: 14px;
  height: 20px;
  line-height: 20px;
}
button {
  position: relative;
  cursor: pointer;
  border: none;
  outline: none;
  width: 100px;
  height: 34px;
  color: #fff;
  border-radius: 4px;
  background: @primary;
  &:hover {
    background: darken(@primary, 10%);
  }
  &:disabled {
    background: lighten(@primary, 20%);
    cursor: not-allowed;
  }
}
</style>