<template>
  <ul class="contact-container">
    <!-- github -->
    <li>
      <a target="_blank" :href="data.github">
      <!-- target="_blank"在新窗口打开 -->
        <div class="icon github">
        <!-- 由于github原图标较小，添加github类样式以便调整 -->
          <Icon type="github" />
        </div>
        <span>{{data.githubName}}</span>
      </a>
    </li>
    <!-- email -->
    <li>
      <a :href="`mailto:${data.mail}`">
        <!-- 点击发送邮件 -->
        <div class="icon">
          <Icon type="mail" />
        </div>
        <span>{{data.mail}}</span>
      </a>
    </li>
    <!-- qq -->
    <li>
      <a
        :href="`tencent://message/?Menu=yes&uin=${data.qq}&Service=300&sigT=45a1e5847943b64c6ff3990f8a9e644d2b31356cb0b4ac6b24663a3c8dd0f8aa12a595b1714f9d45`"
      >
      <!-- 点击发送qq消息 -->
        <div class="icon">
          <Icon type="qq" />
        </div>
        <!-- 外层div主要是为了控制样式 -->
        <span>{{data.qq}}</span>
      </a>
      <div class="pop">
        <img
          :src="data.qqQrCode"
          alt=""
        />
      </div>
    </li>
    <!-- wechat -->
    <li>
      <a href="">
        <div class="icon">
          <Icon type="weixin" />
        </div>
        <span>{{data.weixin}}</span>
      </a>
      <div class="pop">
        <img
          :src="data.weixinQrCode"
          alt=""
        />
      </div>
    </li>
  </ul>
</template>

<script>
import Icon from "@/components/Icon";
import {mapState} from "vuex";
export default {
  components: {
    Icon,
  },
  computed: mapState("setting", ["data"]),
};
</script>

<style scoped lang="less">
@import "~@/styles/var.less";
.contact-container {
  list-style: none;
  padding: 20px;
  margin: 0;
  color: @gray;
  @item-height: 30px;
  li {
    height: @item-height;
    line-height: @item-height;
    margin: 14px 0;
    position: relative;
    &:hover {
      .pop {
        transform: scaleY(1);
        transition: 0.3s;
      }
    }
    a {
      display: flex;
      align-items: center;
      // 纵轴（交叉轴）方向居中
      cursor: pointer;
      span {
        font-size: 14px;
      }
      .icon {
        font-size: 26px;
        // Icon组件的font-size继承父级，故可在此设置字体大小
        width: 36px;
      }
      .github {
        font-size: 28px;
        text-indent: -0.8px;
        // 调整位置
      }
    }
    .pop {
      position: absolute;
      left: 0;
      bottom: @item-height + 5px;
      padding: 10px 15px;
      background-color: #fff;
      border-radius: 5px;
      transform: scaleY(0);
      // 初始状态为不显示，scale缩放
      transform-origin: center bottom;
      // 设置变形中心点
      &::after {
        content: "";
        position: absolute;
        width: 8px;
        height: 8px;
        background: #fff;
        left: 50%;
        transform: translateX(-50%) rotate(45deg);
        bottom: -4px;
      }
      img {
        width: 150px;
        height: 150px;
      }
    }
  }
}
</style>