import Mock from "mockjs";
Mock.mock("/api/about", "get", {
  code: 0,
  msg: "",
  // data: "https://www.strml.net/",
  data: "https://daizhiweii.github.io/about/",
})