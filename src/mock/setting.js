import Mock from "mockjs";
import qqQrCode from "@/assets/qqQrCode.png";
import weixinQrCode from "@/assets/weixinQrCode.png";
Mock.mock("/api/setting", "get", {
  code: 0,
  msg: "",
  data: {
    avatar: "https://img2.baidu.com/it/u=282675288,3241429691&fm=26&fmt=auto&gp=0.jpg",
    siteTitle: "我的个人空间", // 个人空间的标题
    github: "https://github.com/daizhiweii", // github地址
    qq: "1120999545",
    qqQrCode, // qq二维码地址
    weixin: "v1120999545",
    weixinQrCode, // 微信二维码地址
    mail: "1120999545@qq.com",
    icp: "", // 备案号
    githubName: "daizhiweii", 
    favicon: "https://img2.baidu.com/it/u=282675288,3241429691&fm=26&fmt=auto&gp=0.jpg", // 网站的favicon地址
  },
});
